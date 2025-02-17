require('dotenv').config();
const nodemailer = require('nodemailer');

const mailSender = ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
        }
    });

    const message = {
        from: 'Truyện Hay',
        to: email,
        subject,
        html
    };

    transporter.sendMail(message);
};

module.exports = mailSender;