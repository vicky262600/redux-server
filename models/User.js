const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{type: String, required: true, unique: true, min: 4, max: 15},
        email: {type: String, required: true, unique: true},
        password: {type: String, requred: true}
    },
    { timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);