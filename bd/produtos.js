const Sequelize = require('sequelize');
const conexao = require('./conexao');

const produtos = conexao.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: Sequelize.STRING,
    preco: Sequelize.STRING,
    quantidade: Sequelize.STRING
});


produtos.sync({force: false});

module.exports = produtos;



