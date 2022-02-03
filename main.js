// Servidor NodeJs
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ extended: true });

// Criação do servidor que recebe as solicitações do navegador pela porta TCP 8080
const servidor = app.listen(8080, function () {
    const porta = servidor.address().port;
    console.log('Servidor executando na porta %s', porta);
});

// Enviando o conteúdo do 'formulário.html' para o navegador
app.get('/', function (req, res) {
    fs.readFile('formulario.html', function (erro, dado) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});

// Carregando a página 'Idade', após o recebimento dos dados enviados da página 'formulário.html'
app.post('/idade', urlencoded, function (req, res) {
    fs.readFile('idade.html', function (erro, dado) {
        let hoje = new Date();
        let valores = {
            'nome': req.body.nome,
            'anonasc': req.body.anonasc,
            'idade': (hoje.getFullYear() - parseInt(req.body.anonasc))
        };
        
        // Trocando os valores pelos dados obtidos e processados pelo servidor
        for (let chave in valores) {
            dado = dado.toString().replace('{{' + chave + '}}', valores[chave]);
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(dado);
        res.end();
    });
});
