const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail");
// const { data } = require("react-router-dom");

//user registration
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User is already exist" })
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user
        const user = await User.create({
            email,
            password: hashedPassword,
        })

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email
            },
            message: "Registration Successful"
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//user login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        //check password is matching
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "password not matching" })
        }
        res.status(201).json({
            user: {
                id: user._id,
                email: user.email
            },
            message: "Login Successful"
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//forgot password
exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        //check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid user" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        // Use the findByIdAndUpdate method to update the user's email
        const updateToken = await User.findByIdAndUpdate(user._id, { token: token });

        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                token: user.token
            }
        });

        // send email notification 
        // const link = `http://localhost:${process.env.PORT}/api/resetpassword/${token}`;
        // const link = `http://localhost:3000/resetpassword`;
        const link = `https://chand2-password-reset.netlify.app/resetpassword`;
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Password Reset",
            text: `Hi ${user._id}, \n \n Reset your password by clicking on below link. \n\n ${token}`,
            html: `
            <div>
                <h1>To reset your password, Click below</h1>
                <a href="${link}">${link} </a>
                <h2>Enter this token in the reset password form: </h2>
                <p>${token} </p>
            </div>`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error while sending the mail", error)
                return res.status(500).json({ message: 'password reset email not sent' })
            }
            res.status(201).json({ message: "Password reset email is sent successfully" })
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//reset password
exports.resetPassword = async (req, res) => {
    const { email, password, token } = req.body;
    try {
        //check if user exists
        const user = await User.findOne({ email });

        if (!user || !token) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        // console.log(user.token);
        // console.log(req.params.token);
        if (user.token === token) {
            // res.json({ message: "Token matching" })
            //hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if (user) {
                user.password = hashedPassword;
            }
            // Use the findByIdAndUpdate method to update the user's password
            const updatePassword = await User.findByIdAndUpdate(user._id, { password: hashedPassword, token: '' });

            res.status(201).json({
                user: {
                    id: user._id,
                    email: user.email
                },
                message: "Password reset successful"

            });

        }
        else {
            return res.json({ message: "Invalid Token" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
