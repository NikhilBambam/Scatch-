const express = require("express");
const router = express.Router();
const isLoggedin =require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
router.get("/",function (req, res){
    let error = req.flash("error");
    res.render("index",{error,loggedin: false});
});

router.get("/shop", isLoggedin, async function (req, res) {
    try {
        let products = await productModel.find(); // Fetch products from database
        let success = req.flash("success")
        res.render("shop", { products, success}); // Pass products to template
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/addtocart/:productid",isLoggedin,async function(req, res){
   let user= await userModel.findOne({email: req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success","Added to cart");
   res.redirect("/shop");

})



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





router.get("/logout",isLoggedin,function(req,res){
    res.render("shop");
})

module.exports = router;

