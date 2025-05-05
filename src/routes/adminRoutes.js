const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const router=express.Router();

const ticketModel=require("../models/ticketModel");
const {userAuth, isAdmin}=require("../middlewares/auth");

router.get("/getAllTickets",userAuth,isAdmin,async(req,res)=>{
    try{

        const tickets=await ticketModel.find({});
        res.send(tickets);
    }
    catch(err)
    {
        res.status(400).send("error loading tickets"+err.message);
    }
})

router.patch("/:ticketId/updateStatus",userAuth,isAdmin,async(req,res)=>{
    try{
        const ticketId=req.params.ticketId;
        const {status}=req.body;
        const ticket=await ticketModel.findByIdAndUpdate(ticketId,{status:status},{new:true});
        if(!ticket)
        {
            throw new Error("cannot update status");
        }
        res.send(ticket);
    }
    catch(err)
    {
        res.status(400).send("error updating status "+err.message);
    }
})


module.exports=router;