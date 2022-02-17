const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth.js");

const User = require("../models/user");

// @router GET api/auth
// @desc  Check if user loggin in
//@access public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        } else {
            return res.json({ success: true, user });
        }
    } catch (error) {
        res.status(503).json({ success: false, message: "Internal server error" });
    }
});

// @router POST api/auth/register
// @desc register user
// @access public
router.get("/", (req, res) => {
    res.send("hello anh hoang");
    console.log(res);
});

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // simble validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "missing username or password" });
    }
    try {
        const user = await User.findOne({ username: username });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "this username is exist" });
        }
        const hashPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashPassword });
        await newUser.save();

        // return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "user created successfully!",
            accessToken,
        });
    } catch (error) {
        res.json({ success: false, message: "Internal server error" });
    }
});

// @router POST api/auth/login
// @desc login user
// @access public
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: "missing username or password" });
    }

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Incorect username or password" });
        } else {
            const passwordValid = await argon2.verify(user.password, password);
            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );
            if (!passwordValid) {
                return res
                    .status(400)
                    .json({ success: false, message: "Incorect username or password" });
            } else {
                res.json({
                    success: true,
                    message: "user loggin successfully!",
                    accessToken,
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;

