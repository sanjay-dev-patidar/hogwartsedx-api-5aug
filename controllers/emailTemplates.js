const nodemailer = require('nodemailer');
const moment = require('moment');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'workrework.sanjay@gmail.com',
        pass: 'nnefpkztnuxukzsm'
    }
});

const sendPasswordResetEmail = (req, email, token) => {
    const clientIp = requestIp.getClientIp(req);
    const geo = geoip.lookup(clientIp);
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown location';

    const mailOptions = {
        from: 'workrework.sanjay@gmail.com',
        to: email,
        subject: 'Reset Your Password',
        html: `
            <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #3A3A3A; border-radius: 10px; background-color: #F5F5DC;">
                <div style="text-align: center;">
                    <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/email_hogwartsedx_logo.jpeg" alt="HogwartsEdx" style="width: 150px;">
                </div>
                <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                <p style="font-size: 16px; color: #666;">Greetings from HogwartsEdx,</p>
                <p style="font-size: 16px; color: #666;">You are receiving this owl because you (or someone else) have requested to reset the password for your account. Click on the magical button below to reset your password:</p>
                <div style="text-align: center; margin: 20px;">
                    <a href="https://hogwartsedx.vercel.app/reset-password/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4B0082; border-radius: 5px; text-decoration: none;">Reset Password</a>
                </div>
                <p style="font-size: 16px; color: #666;">Access Details:</p>
                <ul style="font-size: 14px; color: #666;">
                    <li>IP Address: ${clientIp}</li>
                    <li>Location: ${location}</li>
                    <li>Time: ${timestamp}</li>
                </ul>
                <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this, please ignore this email and your password will remain unchanged. Mischief Managed!</p>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const sendPasswordResetConfirmationEmail = (req, email) => {
    const clientIp = requestIp.getClientIp(req);
    const geo = geoip.lookup(clientIp);
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const location = geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown location';

    const mailOptions = {
        from: 'workrework.sanjay@gmail.com',
        to: email,
        subject: 'Your Password Has Been Reset Successfully',
        html: `
            <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #3A3A3A; border-radius: 10px; background-color: #F5F5DC;">
                <div style="text-align: center;">
                    <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/HogwartsEdX/email_hogwartsedx_logo.jpeg" alt="HogwartsEdx" style="width: 150px;">
                </div>
                <h2 style="color: #333; text-align: center;">Password Reset Successful</h2>
                <p style="font-size: 16px; color: #666;">Hello from HogwartsEdx,</p>
                <p style="font-size: 16px; color: #666;">This is to confirm that the password for your account has been successfully reset.</p>
                <div style="text-align: center; margin: 20px;">
                    <a href="https://hogwartsedx.vercel.app/login" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #4B0082; border-radius: 5px; text-decoration: none;">Login Now</a>
                </div>
                <p style="font-size: 16px; color: #666;">Access Details:</p>
                <ul style="font-size: 14px; color: #666;">
                    <li>IP Address: ${clientIp}</li>
                    <li>Location: ${location}</li>
                    <li>Time: ${timestamp}</li>
                </ul>
                <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this change, please contact our support team immediately. Mischief Managed!</p>
                <p style="font-size: 14px; color: #777;">For any queries, contact us at <a href="mailto:sanjay.patidar.eduxcel@gmail.com" style="color: #007bff;">sanjay.patidar.eduxcel@gmail.com</a></p>

            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = {
    sendPasswordResetEmail,
    sendPasswordResetConfirmationEmail
};

