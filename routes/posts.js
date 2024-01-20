const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async ( req, res) =>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(400).json(err)
    }
})