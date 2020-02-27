const express = require('express');
const { EMAIL_USER } = require('../config');
const smtpTransport = require('./transport');

const emailRouter = express.Router();

emailRouter.post('/', (req, res, next) => {
  const { email } = req.body;
  const content = `EatWe11 beta registration from ${email}`;

  const mail = {
    from: email,
    to: EMAIL_USER,
    subject: 'New Registration',
    text: content,
  };

  smtpTransport.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail',
      });
      next();
    } else {
      res.json({
        status: 'success',
      });
      next();
    }
  });
});

module.exports = emailRouter;
