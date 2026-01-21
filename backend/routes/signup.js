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



router.post('/', async (req, res) => {
const {name, lastname, pnr, experience, goal, phone, email } = req.body;

if(!name || !pnr || !email){
    return res.status(400).json({message: 'Fält saknas'});
}


const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'PT anmälan',
    text: `
Namn: ${name}
Efternamn: ${lastname}
Personnummer: ${pnr}
Erfarenhet: ${experience}
Mål: ${goal}
Telefon: ${phone}
E-post: ${email}
`
};

try{
await mail.sendMail(mailOptions);
res.json({message: 'Anmälan skickad!'});
} catch (error){
console.error(error);
res.status(500).json({message: 'Kunde inte skicka mail'});
}

});

module.exports = router;