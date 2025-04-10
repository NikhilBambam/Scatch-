const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logout,showLogin,showRegister}= require("../controllers/authController")

router.get("/",function(req,res){
    res.send(" users hey");
});
router.get("/register", showRegister); 

router.get("/login", showLogin);

router.post("/register", registerUser);

router.post("/login",loginUser)

router.get("/logout",logout);

module.exports = router;