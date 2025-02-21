const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateTokenHandler = require("../middleware/validate");


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateTokenHandler, currentUser);

module.exports = router;