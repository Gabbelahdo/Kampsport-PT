const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'supersecret';

const articles = [
    { id: 1, title: 'Träningsprogram för nybörjare', content: 'Tips och övningar...' },
    { id: 2, title: 'Kosttips för thaiboxning', content: 'Bra mat för energi...' },
    { id: 3, title: 'Grundtekniker', content: 'Sparkar, slag, försvar...' },
    { id: 4, title: 'Mental träning', content: 'Fokus och motivation...' },
];

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token saknas' });
    }

    try {
        jwt.verify(token, SECRET);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Ogiltig token' });
    }
};

router.get('/', verifyToken, (req, res) => {
    res.json(articles);
});

module.exports = router;