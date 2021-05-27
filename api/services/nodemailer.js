const nodemailer = require('nodemailer');
const cfg = require('./config');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    post: '587',
    secure: false,
    auth: {
      user: cfg.getValue('mailUser'),
      pass: cfg.getValue('mailPass'),
    },
  },
  {
    from: `Together Bot <${cfg.getValue('mailUser')}>`,
  },
);

module.exports = message => {
  transporter.sendMail(message, (e, info) => {
    if (e) return console.log(e);
  });
};
