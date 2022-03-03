const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const servidor = app.listen(8080, () => {
    const porta = servidor.address().port;
    console.log("Servidor Web rodando na porta %s", porta);
});

app.get("/", ((req, res) => {
    fs.readFile("formulario.html", function (erro, dado) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(dado);
        res.end();
    });
}));

app.post("/idade", urlencodedParser, (req, res) => {
    fs.readFile("idade.html", function (erro, dado) {
        let hoje = new Date();
        let valores = {
            "nome": req.body.nome,
            "anonasc": req.body.anonasc,
            "idade": (hoje.getFullYear() - parseInt(req.body.anonasc))
        };

        for (let chave in valores) {
            dado = dado.toString().replace("{{" + chave + "}}", valores[chave]);
        };

        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.write(dado);
        res.end();
    });
});