
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");

// Show registration form
module.exports.showRegister = function(req, res) {
    res.render('users/register', { 
        title: 'Register',
        error: req.flash('error') ,
        showHeader: false
    });
};

// Show login form
module.exports.showLogin = function(req, res) {
    res.render('users/login', { 
        title: 'Login',
        error: req.flash('error') ,
        showHeader: false
    });
};

// Handle user registration
module.exports.registerUser = async function(req, res) {
    try {
        let {email, password, fullname} = req.body; 

        let user = await userModel.findOne({email:email});
        if(user) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/users/login");
        }
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) {
                    req.flash("error", "Error creating user");
                    return res.redirect("/users/register");
                }
                
                await userModel.create({
                    email,
                    password: hash,
                    fullname
                });
                
                req.flash("success", "Registration successful! Please login.");
                res.redirect("/users/login");
            });
        });
    }
    catch(err) {
        req.flash("error", "Registration failed");
        res.redirect("/users/register");
    }
};

// Handle user login
module.exports.loginUser = async function(req, res) {
    try {
        let {email, password} = req.body;
        let user = await userModel.findOne({email:email});
        
        if(!user) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/users/login");
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
                let token = generateToken(user);
                res.cookie("token", token);
                req.flash("success", "logged in successfully");
                res.redirect("/shop");
            } else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect("/users/login");
            }
        });
    } catch(err) {
        req.flash("error", "Login failed");
        res.redirect("/users/login");
    }
};

// Handle logout
module.exports.logout = function(req, res) {
    res.clearCookie("token");
    res.redirect("/users/login");
};