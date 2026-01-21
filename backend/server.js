const express = require('express');
const cors = require("cors");

const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const signupRoutes = require('./routes/signup');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/articles', articlesRoutes);
app.use('/signup', signupRoutes);

app.get('/', (req, res) => {
    res.send('PT Thaiboxing API körs!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));