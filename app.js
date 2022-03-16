const fs = require("fs");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const server = app.listen(8080, () => {
    const serverPort = server.address().port;
    console.log("Servidor Web em execução na porta %s", serverPort);
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

app.post("/idade", urlencodedParser, ((req, res) => {
    fs.readFile("idade.html", function (err, data) {
        let hoje = new Date();
        let valores = {
            "nome": req.body.nome, // Nome:
            "anoNasc": req.body.anoNasc, // Ano de Nascimento:
            "idade": (hoje.getFullYear() - parseInt(req.body.anoNasc)) // Idade:
        }

        for (let campo in valores) {
            data = data.toString().replace("{{" + campo + "}}", valores[campo]);
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(data);
        res.end();
    });
}));
