const router = require("express").Router();
const User = require("../models/User");

// register
router.post("/register", async (req, res)=>{
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500). json(err);
    }
});

// login
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(500).json("email not exist"); 

        if(user.password === req.body.password){
            res.status(200).json(user);
        }else{
            res.status(500).json("wrong password");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;

 