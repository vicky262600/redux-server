const router = require("express").Router();
const User = require("../models/User");


// get a user
// get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId; // Use req.query to get query parameters
    try {
        const user = await User.findById(userId);
        res.status(200).json({ username: user.username }); // Send response as an object

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router