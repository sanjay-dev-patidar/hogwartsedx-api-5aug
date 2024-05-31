const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'workrework.sanjay@gmail.com',
        pass: 'nnefpkztnuxukzsm'
    }
});

const sendPasswordResetEmail = (email, token) => {
    const mailOptions = {
        from: 'workrework.sanjay@gmail.com',
        to: email,
        subject: 'Reset Your Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                <p style="font-size: 16px; color: #666;">You are receiving this email because you (or someone else) have requested to reset the password for your account. Please click on the button below to reset your password:</p>
                <div style="text-align: center; margin: 20px;">
                    <a href="https://hogwartsedx.vercel.app/reset-password/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Reset Password</a>
                </div>
                <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
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

const sendPasswordResetConfirmationEmail = (email) => {
    const mailOptions = {
        from: 'workrework.sanjay@gmail.com',
        to: email,
        subject: 'Your Password Has Been Reset Successfully',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #333; text-align: center;">Password Reset Successful</h2>
                <p style="font-size: 16px; color: #666;">Hello,</p>
                <p style="font-size: 16px; color: #666;">This is a confirmation that the password for your account has just been successfully reset.</p>
                <div style="text-align: center; margin: 20px;">
                    <a href="https://hogwartsedx.vercel.app/login" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #28a745; border-radius: 5px; text-decoration: none;">Login Now</a>
                </div>
                <p style="font-size: 14px; color: #999; text-align: center;">If you did not request this change, please contact our support team immediately.</p>
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
