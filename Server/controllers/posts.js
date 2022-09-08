const jwt = require('jsonwebtoken');
const Post = require('../models/post')
const User = require('../models/user')
const postRouter = require('express').Router();

const extractTokenFrom = (token) => {

    if (token.toLowerCase().startsWith('bearer ')) {

        return token.substring(7)
    }
    return null
}

postRouter.get('/', async(req, res) => {
    const token = req.headers.authorization;
    console.log("Hello \n\n\n\n\n\n\n\n\n")
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

    const theUser=await User.findById(user.id).populate('posts');
    const allPosts=theUser.posts;
    console.log(allPosts)
    
   
    return res.status(200).json(allPosts)
})

postRouter.post('/', async (req, res) => {
    const { title, message, photo } = req.body;
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

    const newPost = new Post({
        title, message, photo, createdBy: user.id
    })
    const result = await newPost.save();
    const user1 = await User.findById(user.id)
    console.log(user1, result, result._id)
    user1.posts = user1.posts.concat(result._id)
    user1.save();
    // user1.posts=result._id
    return res.end("Successfull")




})

module.exports = postRouter;