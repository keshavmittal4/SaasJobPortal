const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/generateToken");

exports.register = async(req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email});
    if(existingUser) return res.status(400).json({message: "User exists"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateAccessToken(user._id);

    res.json({ token });
}

exports.login = async (req, res) => {
    
}