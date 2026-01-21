const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = process.env.JWT_SECRET || 'supersecret';
require('dotenv').config();
console.log("AUTH ROUTES LOADED");




router.post('/register', async(req, res) => {
console.log("REGISTER HIT", req.body);    
const {username, password} = req.body;
if (!username || !password) return res.status(400).json({ message: 'Saknar användarnamn eller lösenord' });

const [existing] = await db.execute(
'SELECT id FROM users WHERE username = ?',
[username]
);

if(existing.length > 0){
    return res.status(400).json({message: 'Användarnamn redan taget'});
}

const hashedLosenord = await bcrypt.hash(password, 10);

const [resultat] = await db.execute(
'INSERT INTO users (username, password) VALUES (?, ?)',
[username, hashedLosenord]
);


res.json({message: 'Användare skapad!', user: {id: resultat.insertId, username: username}});

});


router.post('/login', async(req, res) => {
const { username, password } = req.body;
const [users] = await db.execute(
'SELECT * FROM users WHERE username = ?',
[username]   
);



if(users.length === 0){
return res.status(401).json({message: 'Fel användarnamn eller lösenord'})
} 

const user = users[0];
const valid = await bcrypt.compare(password, user.password);
if(!valid) return res.status(401).json({message: 'Fel användarnamn eller lösenord'});

const token = jwt.sign({id: user.id,username: user.username }, SECRET, {expiresIn: '1h'});
res.json({token});
});


module.exports = router;
