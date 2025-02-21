const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "name is required"],
            unique: [true, "username is already taken"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "email is already taken"]
        },
        password: {
            type: String,
            required: [true, "password is required"]
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema);