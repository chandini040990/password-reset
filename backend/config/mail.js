const nodemailer = require('nodemailer');
// dotenv must be used
const dotenv = require('dotenv');

dotenv.config();
// dotenv

// create the transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// veify the transporter configuration 
transporter.verify((error) => {
    if (error) {
        console.log("error with config", error)
    } else {
        console.log("Mail configurations are correct")
    }
})


module.exports = transporter 