const router = require("express").Router();
const Post = require("../models/Post");


// create a post
router.post("/", async ( req, res) =>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(400).json(err)
    }
});

// delete a post
router.delete("/:id", async(req, res)=>{
    const thePost = await Post.findById(req.params.id);
    if(thePost.userId !== req.body.userId){
        res.status(500).json("you can only delete your post")
    }else{
        await thePost.deleteOne();
        res.status(200).json("the post has been deleted");
    }
});

// like/dislike the post
router.put("/:id/like", async (req, res) =>{
    const post = await Post.findById(req.params.id);
    const userId = req.body.userId;
    if(post.like.includes(userId)){
        await post.updateOne({$pull:{like: req.body.userId}});
        res.status(200).json("you have disliked the post");

    }else{
        await post.updateOne({ $push:{like: req.body.userId}});
        res.status(200).json("you have liked the post");
    }
});

// get posts
router.get("/timeline", async(req, res) =>{
    try{
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    }catch(err){
        res.status(501).json("no post");
    }
})

module.exports = router