const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const cookieParser=require("cookie-parser");
const authRoutes=require("./routes/authRoutes");
const ticketRoutes=require("./routes/ticketRoutes");
const adminRoutes=require("./routes/adminRoutes");
require("./config/database");
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const userModel=require("./models/userModel");

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/users",authRoutes);
app.use("/api/tickets",ticketRoutes);
app.use("/api/admin",adminRoutes);



app.listen(3000,()=>{
    console.log("connected to DB successfully,listening at 3000 port");
})