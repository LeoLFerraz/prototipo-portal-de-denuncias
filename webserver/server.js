const express = require('express');
const path = require("path");
const appConfig = require(process.cwd() + '/configs/appConfig.json');
const mongoose = require("mongoose");
const mongoURI = "mongodb://admin:Alpha123@alphajunior-shard-00-00-cmbjw.mongodb.net:27017,alphajunior-shard-00-01-cmbjw.mongodb.net:27017,alphajunior-shard-00-02-cmbjw.mongodb.net:27017/test?ssl=true&replicaSet=AlphaJunior-shard-0&authSource=admin&retryWrites=true";
const app = express();
app.set('view engine', 'ejs'); // Mudamos a plataforma de templates de PUG (default do express) para EJS.

mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log("BD conectado");
    })
    .catch(err => console.log(err));

// Servir arquivos estáticos (stylesheets, scripts, mídia, etc):
app.use(express.static(path.join(__dirname, '/static')));

// Rotas:
app.use('/', require(process.cwd() + '/routes/index.js'));

app.listen(appConfig.serverPort, () => {
    console.log("Server iniciado. Porta: " + appConfig.serverPort);
});