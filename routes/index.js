const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const usersRouter = require('./usersRouter');

// Home page - redirect based on auth status
router.get('/', function(req, res) {
    if (req.user) {
        return res.redirect('/shop');
    }
    res.redirect('/users/register');
});

// Users routes
router.use('/users', usersRouter);

// Shop routes (protected)
router.get('/shop', isLoggedin, async function(req, res) {
    try {
        let products = await productModel.find();
        let success = req.flash("success");
        res.render("shop", { 
            products, 
            success,
            user: req.user 
        });
    } catch (error) {
        console.error("Error:", error);
        req.flash("error", "Failed to load products");
        res.redirect('/');
    }
});

// Cart routes (protected)
router.get('/addtocart/:productid', isLoggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart.push(req.params.productid);
        await user.save();
        req.flash("success", "Added to cart");
        res.redirect('/shop');
    } catch (error) {
        req.flash("error", "Failed to add to cart");
        res.redirect('/shop');
    }
});

router.get("/cart", isLoggedin, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    
    if (!user || user.cart.length === 0) {
        return res.render("cart", { user, cart: [], totalBill: 0 });
    }

    let totalBill = user.cart.reduce((acc, item) => {
        return acc + (Number(item.price) + 20 - Number(item.discount));
    }, 0);

    res.render("cart", { user, cart: user.cart, totalBill });
});



router.post("/cart/decrease/:id", isLoggedin, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        let productIndex = user.cart.findIndex(item => item._id.toString() === req.params.id);

        if (productIndex !== -1) {
            let product = user.cart[productIndex];

            if (product.quantity > 1) {
                product.quantity -= 1;
                await product.save();
                res.json({ success: true, message: "Quantity decreased", newQuantity: product.quantity });
            } else {
                // Remove product if quantity is 1
                user.cart.splice(productIndex, 1);
                await user.save();
                res.json({ success: true, message: "Product removed", removed: true });
            }
        } else {
            res.json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        res.json({ success: false, message: "Error decreasing quantity" });
    }
});

router.post('/cart/increase/:productId', isLoggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate("cart");
        const productId = req.params.productId;

        const cartItem = user.cart.find(item => item._id.toString() === productId);
        
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        cartItem.quantity = (cartItem.quantity || 1) + 1;
        await cartItem.save(); // Save the individual cart item

        res.json({ success: true, message: 'Quantity increased', newQuantity: cartItem.quantity });
    } catch (error) {
        console.error("Increase error:", error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;