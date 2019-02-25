const express = require('express');
const appConfig = require(__dirname + '/configs/appConfig.json');
require("marko/node-require");
const markoExpress = require("marko/express");

const app = express();

// Habilitar renderização de views via markoJS:
app.use(markoExpress());

// Servir arquivos estáticos (stylesheets, scripts, mídia, etc):
app.use(express.static(__dirname + '/static'));

// Rotas:
app.use('/', require(__dirname + '/routes/index.js'));
app.use('/api', require(__dirname + '/routes/api.js'));

app.listen(appConfig.serverPort, () => {
    console.log("Server iniciado. Porta: " + appConfig.serverPort);
});