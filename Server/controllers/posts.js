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
    const token = req.headers.authorization;
    console.log("No Hello \n\n\n\n\n\n\n\n\n")
    console.log(req.headers.authorization)
    if (!token) {
        return res.status(400).end("You must Log in first")
    }
    const decodedToken = extractTokenFrom(token)
    console.log("Before")
    let user;
    try {
        user = await jwt.verify(decodedToken, 'Vikas')
    }
    catch (error) {

        console.log("error happened")
    }
    console.log(user)

    console.log("After")
    if (!user) {
        return res.status(400).end("User not verified")
    }

    const theUser = await User.findById(user.id).populate('posts');
    const allPosts = theUser.posts;
    


    return res.status(200).json(allPosts)
})

postRouter.post('/', async (req, res) => {
    const { title, message, photo, tags } = req.body;
    //const token = req.get('autherization');
    const token = req.headers.authorization;
    if (!title || !message || !photo) {
        return res.status(400).end("All Fields are required")
    }

    if (!token) {
        return res.status(400).end("You must Log in first")
    }

    const decodedToken = extractTokenFrom(token)
    console.log("Before")
    let user;
    try {
        user = await jwt.verify(decodedToken, 'Vikas')
    }
    catch (error) {

        console.log("error happened in token\n\n\n\n")
    }


    console.log("After")
    if (!user) {
        return res.status(400).end("User not verified")
    }
    const createdAt = new Date();
    const newPost = new Post({
        name: user.name, title, message, photo, createdAt, createdBy: user.id, tags
    })
    
    const result = await newPost.save();
    const user1 = await User.findById(user.id)
    console.log(user1, result, result._id)
    user1.posts = user1.posts.concat(result._id)
    user1.save();
    // user1.posts=result._id
    return res.end("Successfull")
})

postRouter.delete('/delete/:id', async (req, res) => {
    const token = req.headers.authorization;
    const id = req.params.id;
    console.log("Atleast Hello \n\n\n\n\n\n\n\n\n")
    console.log(req.headers)
    if (!token) {
        return res.status(400).end("You must Log in first")
    }

    const decodedToken = extractTokenFrom(token)
    console.log("Before")
    let user;
    try {
        user = await jwt.verify(decodedToken, 'Vikas')
    }
    catch (error) {

        console.log("error happened")
    }
    console.log(user)

    console.log("After")
    if (!user) {
        return res.status(400).end("User not verified")
    }
    
    let theUser = await User.findById(user.id).populate('posts');
    console.log("the \n\\n\n",theUser)
    const thePosts=theUser.posts.filter(post=>{
        console.log(post, post._id, post.id, id)
        return post.id!==id});
    theUser.posts=thePosts;
    console.log("the \n\\n\n",thePosts,"\n\n\n\n",theUser)
    theUser.save()
    await Post.findByIdAndDelete(id);
    //const allPosts = theUser.posts;
    


    return res.status(200).json(thePosts)
})


postRouter.patch('/like/:id', async (req, res) => {
    const id = req.params.id;
    console.log("are you here atleast?")
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    console.log("Here also\n\n\n\n")
    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
})

module.exports = postRouter;