const mongoose=require("mongoose");

const ticketSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    description:{
        type:String,
        required:true,
        minlength: 10,
        maxlength: 1000
    },
    status:{
        type:String,
        enum:['open','closed','in-progress'],
        default:"open"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    replies:[
        {
            message:String,
            sender:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }        

    ],
    createdAt:{
        type:Date,
        default:Date.now
    }

})
const ticketModel=mongoose.model("Ticket",ticketSchema);
module.exports=ticketModel;