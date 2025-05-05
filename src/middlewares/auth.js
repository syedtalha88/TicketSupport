const userModel=require("../models/userModel");
const jwt=require("jsonwebtoken");

const userAuth=async(req,res,next)=>{

    try{
        const cookies=req.cookies;
        const {token}=cookies;
        if (!token) {
            throw new Error("token not found");
        }
        const decode=await jwt.verify(token,"talha124");
        const {_id}=decode;
        const user=await userModel.findById({_id});
        if(!user)
        {
            throw new Error("user not found ");
        }
        else{
            req.user=user;
            next();
        }
    }
    catch(err)
    {
        res.status(400).send("something went wrong in auth"+err.message);
    }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied. Admins only.");
  }
  next();
};

module.exports={userAuth,isAdmin};