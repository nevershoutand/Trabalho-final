const express = require('express');
const bodyParser = require('body-parser');
const conexao = require('./bd/conexao');
const Sequelize = require('sequelize');
const produtos = require('./bd/produtos');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

conexao.authenticate();

app.get("/", function (req, res) {
    res.render("produtos/novo", { mensagem: "" });
});
app.get("/produtos/novo", function (req, res) {
    res.render("produtos/novo", { mensagem: "" });
});

app.get("/produtos/lista/:mensagem?", function (req, res) {
    produtos
        .findAll({ order: ["nome"] }).then(function (produtos) {   
                res.render("produtos/produtos", { produtos: produtos, mensagem: ""});
        });
});

app.get("/produtos", function(req, res){
    produtos.findAll().then(function (produtos){
     res.render ("produtos/produtos", {produtos: produtos});   
    });
   
});

app.post("/produtos/salvar", function (req, res) {
    let nome = req.body.nome;
    let preco = req.body.preco;
    let quantidade = req.body.quantidade;
   produtos.create ({nome:nome, preco:preco, quantidade:quantidade}).then(res.render("produtos/novo", {mensagem: "Categoria incluída"}));
});

app.get("/produtos/editar/:id", function(req, res){
    let id = req.params.id;
    produtos.findByPk(id).then(function(produto){
        res.render ("produtos/editar", {produto:produto});
    });
});

app.post("/produtos/atualizar", function (req, res) {
    let id = req.body.id;
    let nome = req.body.nome;
    let preco = req.body.preco;
    let quantidade = req.body.quantidade;
    produtos.update({ nome:nome, preco:preco, quantidade:quantidade}, { where: { id: id } }).then(function () {
            res.redirect("/produtos");
        });
});

app.get("/produtos/excluir/:id", function (req, res) {
    let id = req.params.id;
    produtos
        .destroy({ where: { id: id } })
        .then(function () {
            res.redirect("/produtos/lista");
        })
        .catch(function(erro){
            if(erro instanceof Sequelize.ForeignKeyConstraintError) {
                res.redirect("/produtos/lista/erro");
            }
        });
});
 

app.listen(3000);