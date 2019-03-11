const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Denuncia = require(process.cwd() + "/models/denunciaModel.js");

// Conectando com o BD:
const mongoURI = "mongodb://admin:Alpha123@alphajunior-shard-00-00-cmbjw.mongodb.net:27017,alphajunior-shard-00-01-cmbjw.mongodb.net:27017,alphajunior-shard-00-02-cmbjw.mongodb.net:27017/test?ssl=true&replicaSet=AlphaJunior-shard-0&authSource=admin&retryWrites=true";
mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log("BD conectado");
    })
    .catch(err => console.log(err));


// Rota Denúncias:
router.get('/denuncias', (req, res) => {
    console.log(req.query);
    let auxJSON = [];
    Denuncia.find(req.query, (err, denuncias) => { // TODO IMPORTANTE: Não deixar visibilidade=1 sem chave especial no servidor (API é auth-única)
        if(denuncias) { // previnindo "cannot read undefined"
            denuncias.forEach(function (denuncia) {
                auxJSON.push(denuncia);
            });
        }
        else {
            auxJSON.push("Nenhuma denúncia encontrada");
        }
    })
    .then(() => {
        res.send(auxJSON);
        res.end();
    })
    .catch((err) => {
        console.log(err);
    });

});
router.post('/denuncias', (req, res) => {
    console.log("Post recebido. Objeto: " + req.body.descricao);
    const denunciaNova = new Denuncia({
        descricao: req.body.descricao,
        email: req.body.email,
        visibilidade: req.body.visibilidade,
        status: 1,
        datahora: Date.now()
    });
    denunciaNova.save()
        .then(() => {
            denunciaNova._id = "[redatado]";
            res.status(200).send("Denuncia salva com sucesso" + denunciaNova);
        })
        .catch((err) => {
            denunciaNova._id = "[redatado]";
            res.status(400).send("Problema salvando a denúncia" + denunciaNova);
            console.log(err);
        });
});

module.exports = router;