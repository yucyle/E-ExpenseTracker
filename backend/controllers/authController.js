const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require("../models/userModel.js");

/* REGISTER */
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body; //grab from req.body
    
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
    
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        console.log(newUser);
        // const savedUser = await newUser.save();
        return res.status(201).json({ 'success': `New user ${newUser.firstName} created!` });
    } catch (err) {
        return res.status(500).json({ 'error': err.message });
    }
};

/* LOG IN */
const login = async (req, res) => {
    try 
    {
        const { email, password } = req.body; //grab from req.body
        if (!email || !password) return res.status(400).json({ "message": "Email and password are required!" });

        const foundUser = await User.findOne({ email: email});
        if (!foundUser) return res.status(400).json({ "message": "Email or password is not correct!"});

        const match = await bcrypt.compare(password, foundUser.password);
        console.log(match);
        if (!match) return res.status(401).json({ "message": "Email or password is not correct!" });
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "id": foundUser._id
                    // "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: '20s' }
            { expiresIn: '270m' }
        );
        
        const refreshToken = jwt.sign(
            { "id": foundUser._id},
            process.env.REFRESH_TOKEN_SECRET,
            // { expiresIn: '30s' }
            { expiresIn: '7d' }
        )

        delete foundUser.password;

        // res.cookie("jwt", refreshToken, {
        //     // httpOnly: true, //accessible only by web server 
        //     // secure: false, //https
        //     // sameSite: 'None', //cross-site cookie 
        //     maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        // });
        // res.cookie("userId", foundUser._id, {
        //     httpOnly: true, //accessible only by web server 
        //     secure: false, //https
        //     sameSite: 'None', //cross-site cookie 
        //     maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        // });
        
        return res.status(200).json({ accessToken, foundUser, refreshToken });
    } catch (err) {
        return res.status(500).json({ 'error': err.message });
    }
};

/* REFRESH */
const refresh = (req, res) => {
    const cookies = req.cookies;
    console.log(req);
    if (!cookies?.jwt) return res.status(401).json({ message: "No cookies" });
    // if (!cookies?.userId) return res.status(401).json({ message: "userId" });
    const refreshToken = cookies.jwt;
    // const userId = cookies.userId;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            // console.log(decoded);
            const userId = decoded.id;
            const foundUser = await User.findOne({ _id: decoded.id});
            const username = foundUser.firstName + ' ' + foundUser.lastName;
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized User' })

            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "id": foundUser._id
                        // "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '270m' }
            );

            return res.status(200).json({ accessToken, userId, username });
        })
    )
};

/* LOG OUT */
const logout = (req, res) => {
    const cookies = req.cookies;
    console.log(req);
    if (!cookies?.jwt) return res.status(401).json({ message: "No cookies" });; //No content
    res.clearCookie('jwt', { 
        // httpOnly: true, 
        // sameSite: 'None', 
        secure: false 
    });
    return res.json({ message: 'Cookie cleared' });
};

module.exports = { register, login, refresh, logout };