const express = require('express');
const router = express.Router();
const axios = require("axios"); // Usamos Axios para fazer as requests à API

// GET routes:
router.get('/', (req, res) => {
    res.render(process.cwd() + '/views/index.ejs', {});
});

router.get('/comissao', (req, res) => {
    res.render(process.cwd() + '/views/comissao.ejs', {});
});

// POST routes:
router.post('/', (req,res) => {
    let auxUser = {};
    auxUser.nome = req.body.nome;
    auxUser.email = req.body.email;
    if(!auxUser.nome || !auxUser.email) {
        res.render(process.cwd() + '/views/comissao.ejs', {}); // TODO: RENDER error FLASH MESSAGE
        res.end();
    }

    res.render(process.cwd() + '/views/comissao.ejs', {}); // TODO: RENDER success FLASH MESSAGE
});

module.exports = router;
