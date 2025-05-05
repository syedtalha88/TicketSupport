const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const router=express.Router();

const ticketModel=require("../models/ticketModel");
const {userAuth, isAdmin}=require("../middlewares/auth");

router.post("/createTicket",userAuth,async(req,res)=>{
    try{
        const {title,description}=req.body;
        const tickets=new ticketModel({title:title,description:description,createdBy:req.user._id});
        await tickets.save();
        res.send("ticket created successfully");
    }
    catch(err)
    {
        res.status(400).send("error creating ticket"+err.message);
    }
})

router.get("/myTickets",userAuth,async(req,res)=>{
    try{
        const {_id}=req.user;
        const tickets=await ticketModel.find({createdBy:_id});
        if(!tickets)
        {
            throw new Error("no tickets found ");
        }
        res.send(tickets);

    }
    catch(err)
    {
        res.status(400).send("error getting the tickets",err.message);
    }
})

router.get("/myTickets/:ticketId",userAuth,async(req,res)=>{
    try
    {   
        const ticketId=req.params.ticketId;
        const ticket=await ticketModel.findById(ticketId);
        if(!ticket)
        {
            throw new Error("cannot find the ticket");
        }
        if (ticket.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("You are not authorized to view this ticket");
        }
        res.send(ticket);

    }
    catch(err)
    {
        res.status(400).json("error getting tickets"+err.message);
    }
})

router.patch("/myTickets/:ticketId",userAuth,async(req,res)=>{
    try
    {
        const id=req.params.ticketId;
        const updatedData=req.body;
        const updatedTicket=await ticketModel.findByIdAndUpdate(id,updatedData);
        if(!updatedTicket)
        {
            throw new Error("ticket not found");

        }
        if (updatedTicket.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).send("You are not authorized to update this ticket");
        }
        res.send(updatedTicket);
    }
    catch(err)
    {
        res.status(400).send("error updating ticket "+err.message);
    }
})

router.post("/myTickets/:ticketId/replies",userAuth,isAdmin,async(req,res)=>{
    try{
        const {message}=req.body;
        const ticketId=req.params.ticketId;
        const ticket =await ticketModel.findByIdAndUpdate(ticketId,{
            $push:{
                replies:{
                    message,
                    sender:req.user._id
                }
            }
        },
        {new:true}
        )
        if(!ticket)
        {
            throw new Error("cannot add replies");
        }
        res.send(ticket);
    }
    catch(err)
    {
        res.status(400).send("error getting replies"+err.message);
    }
})

router.get("/myTickets/:ticketId/replies",userAuth,async(req,res)=>{
    try{
        const ticketId=req.params.ticketId;
        
        const replies=await ticketModel.findById(ticketId);
        if(!replies)
        {
            throw new Error("no replies");
        }
        res.send(replies.replies);
    }
    catch(err)
    {
        res.status(400).send("error fetching the replies"+err.message);
    }
})
module.exports=router;