const router = require("express").Router();
const User = require("../models/User");


// get a user
router.get("/", async (req, res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findById(userId);
        res.status(200).json(user.username);

    }catch(err){
        res.status(500).json(err);
        // console.log("sldkfn");
    }
})

module.exports = router