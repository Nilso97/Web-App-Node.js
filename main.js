// Node JS Servidor
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: true });

const servidor = app.listen(8080, function () {
    const porta = servidor.address().port;
    console.log('Servidor executando na porta %s', porta);
});

app.get('/', function (req, res) {
    fs.readFile('formulario.html', function (erro, dado) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});

app.post('/idade', urlencoded, function (req, res) {
    fs.readFile('idade.html', function (erro, dado) {
        let hoje = new Date();
        let valores = {
            'nome': req.body.nome,
            'anonasc': req.body.anonasc,
            'idade': (hoje.getFullYear() - parseInt(req.body.anonasc))
        };

        for (let chave in valores) {
            dado = dado.toString().replace('{{' + chave + '}}', valores[chave]);
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});
