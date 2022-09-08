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
  console.log("Request is here")
   if((!username)||(!password))
   {
      
      return res.status(200).send({err:"All Fields are required"})
   }
   const user=await User.findOne({username})
   const passwordCorrect= await bcryptjs.compare(password,user.password)
   if(!passwordCorrect||!user)
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
   console.log("Hello Token",token)

   return res.status(200).send({user,token})
})

module.exports = loginRouter;