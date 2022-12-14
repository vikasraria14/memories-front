const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const loginRouter=require('express').Router();
const User=require('../models/user')
loginRouter.get('/',async (req,res)=>{
   console.log("Here to get /login ")
   const AllUsers=await User.find({})
   res.status(200).json(AllUsers)
})

loginRouter.post('/',async (req,res)=>{
   const {username,password}=req.body;
  
   if((username==="")||(password===""))
   {
      
      return res.status(200).send({err:"All Fields are required"})
   }
   const user=await User.findOne({username})
   if(!user)
   {
      return res.status(200).send({err:"Username or Password is incorrect"})
   }
   const passwordCorrect= await bcryptjs.compare(password,user.password)
   if(!passwordCorrect)
   {
      
     
      return res.status(200).send({err:"Username or Password is incorrect"})
     // res.end("username or password incorrect")
   }
   
   const userForToken={
      username:user.username,
      id:user.id,
      name:user.name
   }

   const token=jwt.sign(userForToken,"Vikas");
   

   return res.status(200).send({user,token})
})

module.exports = loginRouter;