const config = require('../config');
const nodemailer = require('nodemailer');
const fs = require("fs");

let transporter = nodemailer.createTransport({
    host: config.mailer.host,
    port: config.mailer.port,
    secure: false,
    //ignoreTLS: true,
    auth: {
        user: config.mailer.username,
        pass: config.mailer.password
    },
});
let mailer = {
    subscribe: (email) => {
        console.log(`sending mail to ${email}`);
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                to: email,
                from: 'Vikas from Analytiks.io <info@analytiks.io>',
                subject: 'Free Subscription Confirmed.',
                text: 'Thank you for subscribing to the launch of Analytiks.io! Now Measure, Analyze, Optimize and Automate the Growth of your Instagram Account effortlessly - your 1 year Free Subscription is confirmed!',
                html: fs.readFileSync('./public/mailer.html').toString()
            }, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        });
    }
}

module.exports = mailer;