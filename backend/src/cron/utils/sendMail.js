require("dotenv").config();
const { transporter } = require("./transporteurMail");

// async..await is not allowed in global scope, must use a wrapper
async function sendingMail(mail, friend) {
  // send mail with defined transport object
  await transporter.sendMail({
    from: process.env.SENDER_ADDRESS, // sender address
    to: mail, // list of receivers
    subject: "[BirthdayPal] - 🎊 Hey, il y a un anniversaire !", // Subject line
    text: `🎊 C'est l'anniversaire de votre ami: ${friend} 🎊`, // plain text body
    html: `🎊 C'est l'anniversaire de votre ami: ${friend} 🎊`, // html body
  });
}

module.exports = sendingMail;
