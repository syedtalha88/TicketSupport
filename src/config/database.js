const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://talhasyed255:Syed1245@cluster0.3qmcedh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}
connectDB().then(()=>{
    console.log("database connection successful");
}).catch((err)=>{
    console.log("connection cannot establish");
})
module.exports=connectDB;