const bcrypt=require("bcrypt");
const express=require("express");
const router = express.Router();
const userModel=require("../models/userModel");
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");

router.post("/signup",async(req,res)=>{
    try{
        const {name,username,password,isAdmin}=req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const user=new userModel({
            name,
            username,
            password:hashPassword,
            isAdmin
        });
        await user.save();
        res.send("user created successfully");
    }
    catch(err)
    {
        res.status(400).send("error siginin up"+err.message);
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await userModel.findOne({username:username});
        if(!user)
        {
            throw new Error("user not found ");
        }
        const isValid=await bcrypt.compare(password,user.password);
        if(isValid)
        {
            const token=await jwt.sign({_id:user._id},"talha124");
            res.cookie("token",token);
            console.log(token);
            res.send("user logged in successful");
        }
        else
        {
            throw new Error("invalid credentials");
        }
    }
    catch(err)
    {
        res.status(400).send("error loggin in "+err.message);
    }
})

router.get("/profile",userAuth,async(req,res)=>{
    try
    {
        const user=req.user;
        res.send(user);

    }
    catch(err)
    {
        res.status(400).send("error accessing profile"+err.message);
    }
})
module.exports=router;