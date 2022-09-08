const bcryptjs=require('bcryptjs');
const signUpRouter=require('express').Router()
const User=require('../models/user')
signUpRouter.get('/',(req,res)=>{
    res.end('Signup')
})

signUpRouter.post('/',async (req,res)=>{
    const {name,username,password}=req.body;
    
    if(!name||!username||!password)
    {
       return res.status(400).end("All fields are required");
    }

    const userExists=await User.findOne({username})
    console.log(userExists)
    if(userExists)
    {
        
        return res.status(400).end("User Already Exists")
    }
        const saltRounds=10;
        const passwordHash=await bcryptjs.hash(password,saltRounds)
        const newUser=new User({name,username,password:passwordHash});
        await newUser.save();
        return res.end("User Created")
    
    
})

module.exports=signUpRouter