const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();


let mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// verify transporter at startup to catch auth/connect issues early
mail.verify((err, success) => {
    if (err) console.error('Mail transporter error', err);
    else console.log('Mail transporter ready');
});



router.post('/', async (req, res) => {
const {
  name, namn, lastname, efternamn,
  pnr, personnummer, experience, goal, phone, email
} = req.body;

const applicantName = name || namn || '';
const applicantLastname = lastname || efternamn || '';
const applicantPnr = pnr || personnummer || '';
const applicantEmail = email || '';
const applicantExperience = experience || '';
const applicantGoal = goal || '';
const applicantPhone = phone || '';

if (!applicantName || !applicantPnr || !applicantEmail) {
  console.log('Signup payload:', req.body); 
  return res.status(400).json({ message: 'Fält saknas' });
}

try {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'PT anmälan',
    text: `
Namn: ${applicantName}
Efternamn: ${applicantLastname}
Personnummer: ${applicantPnr}
Erfarenhet: ${applicantExperience}
Mål: ${applicantGoal}
Telefon: ${applicantPhone}
E-post: ${applicantEmail}
`
  };

  await mail.sendMail(mailOptions);
  res.json({ message: 'Anmälan skickad!' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Kunde inte skicka mail', error: error.message });
}

});

module.exports = router;