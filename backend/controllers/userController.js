const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
// @desc Register User
// @route post /api/users/register
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const useravailable = await User.findOne({ email });
    if (useravailable) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    console.log("User Created", user);
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("Invalid User Data");
    }
    res.send({ message: "Register User" });
})
// @desc login
// @route post /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            }
        )
        res.status(200).json(accesstoken);
    }
    else {
        res.status(400);
        throw new Error("Invalid Credentials");
    }

})

// @desc CurrentUser
// @route get /api/users/current
// @access Public

const currentUser = asyncHandler(async (req, res) => {
    res.send(req.user);
})

module.exports = { registerUser, loginUser, currentUser };