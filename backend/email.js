const nodemailer = require('nodemailer');

/**
 * Sends an email using nodemailer.
 * Configured for Mailgun SMTP.
 */
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailgun.org', // Mailgun SMTP server
      port: 587,
      auth: {
        user: process.env.MAILGUN_USER,
        pass: process.env.MAILGUN_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Skincare App" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Email sent successfully to:', email);
  } catch (error) {
    console.error('Email delivery failed:', error.message);
  }
};

module.exports = { sendEmail };