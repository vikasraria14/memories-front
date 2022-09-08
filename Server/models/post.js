const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    name:String,
    title:String,
    message:String,
    photo:String,
    tags:[String],
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }, 
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
})

const Post=mongoose.model('Post',postSchema)
module.exports=Post;