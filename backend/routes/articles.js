const express = require('express');
const router = express.Router();

const articles = [
    { id: 1, title: 'Träningsprogram för nybörjare', content: 'Tips och övningar...' },
    { id: 2, title: 'Kosttips för thaiboxning', content: 'Bra mat för energi...' },
    { id: 3, title: 'Grundtekniker', content: 'Sparkar, slag, försvar...' },
    { id: 4, title: 'Mental träning', content: 'Fokus och motivation...' },
];

router.get('/', (req, res) => {

    res.json(articles);

});

module.exports = router;