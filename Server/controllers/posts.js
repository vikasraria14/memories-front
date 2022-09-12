const jwt = require('jsonwebtoken');
const Post = require('../models/post')
const User = require('../models/user')
const postRouter = require('express').Router();
const mongoose = require('mongoose')
const extractTokenFrom = (token) => {

    if (token.toLowerCase().startsWith('bearer ')) {

        return token.substring(7)
    }
    return null
}

postRouter.get('/', async (req, res) => {

    console.log("post get Request")
    const token = req.headers.authorization;
   
    if (!token) {
        return res.status(400).end("You must Log in first")
    }
    const decodedToken = extractTokenFrom(token)
    
    let user;
    try {
        user = await jwt.verify(decodedToken, 'Vikas')
    }
    catch (error) {

        console.log("error happened")
    }
    

   
    if (!user) {
        return res.status(400).end("User not verified")
    }

    const theUser = await User.findById(user.id).populate('posts');
    let allPosts = theUser.posts;
    allPosts=allPosts.reverse()

    return res.status(200).json(allPosts)
})

postRouter.post('/', async (req, res) => {
    console.log("post post Request")
    const { title, message, photo, tags } = req.body;
    
    const token = req.headers.authorization;
    if (!title || !message || !photo) {
        return res.status(400).end("All Fields are required")
    }

    if (!token) {
        return res.status(400).end("You must Log in first")
    }

    const decodedToken = extractTokenFrom(token)
   
    let user;
    try {
        user = await jwt.verify(decodedToken, 'Vikas')
    }
    catch (error) {

        
    }


    
    if (!user) {
        return res.status(400).end("User not verified")
    }
    const createdAt = new Date();
    const newPost = new Post({
        name: user.name, title, message, photo, createdAt, createdBy: user.id, tags
    })
    
    const result = await newPost.save();
    const user1 = await User.findById(user.id)
  
    user1.posts = user1.posts.concat(result._id)
    user1.save();
    // user1.posts=result._id
    return res.status(200).json(newPost)
})

postRouter.delete('/delete/:id', async (req, res) => {
    console.log("post delete Request")
    const token = req.headers.authorization;
    const id = req.params.id;
   
    if (!token) {
        return res.status(400).end("You must Log in first")
    }

    const decodedToken = extractTokenFrom(token)
   
    let user;
    try {
        user = await jwt.verify(decodedToken, 'Vikas')
    }
    catch (error) {

        console.log("error happened")
    }
   
    if (!user) {
        return res.status(400).end("User not verified")
    }
    
    let theUser = await User.findById(user.id).populate('posts');
   
   
   
    theUser.save()
    await Post.findByIdAndDelete(id);
    
    


    return res.status(200).json({data:true})
})


postRouter.patch('/like/:id', async (req, res) => {
    console.log("post patch Request")
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
 
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
})

module.exports = postRouter;