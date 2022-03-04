/////////////////////////////////////////////////////////////////
/////////////////// Servidor Web com NodeJS /////////////////////
/////////////////////////////////////////////////////////////////
/////////////////// Autor: Nilso Junior /////////////////////////
/////////////////////////////////////////////////////////////////
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const server = app.listen(8080, () => {
    const serverPort = server.address().port;
    console.log("Servidor Web rodando na porta %s", serverPort);
});

app.get("/", ((req, res) => {
    fs.readFile("formulario.html", function (err, data) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(data);
        res.end();
    });
}));

app.post("/idade", urlencodedParser, (req, res) => {
    fs.readFile("idade.html", function (err, data) {
        let hoje = new Date();
        let valores = {
            "nome": req.body.nome,
            "anonasc": req.body.anonasc,
            "idade": (hoje.getFullYear() - parseInt(req.body.anonasc))
        };

        for (let chave in valores) {
            data = data.toString().replace("{{" + chave + "}}", valores[chave]);
        };

        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(data);
        res.end();
    });
});
