const express = require('express');
const router = express.Router();
const itensController = require('../controller/itensController');
const produtosController = require('../controller/produtosController');
const vendasController = require('../controller/vendasController');
const forncedoresController = require('../controller/fornecedoresController');
const funcionariosController = require('../controller/funcionariosController');
const backup = require("../model/backup.js");

//Itens
router.get('/itens', (req, res) => itensController.getItens(req, res));

router.post('/itens', (req, res) => itensController.postItens(req, res));

router.put('/itens/:codigo', (req, res) => itensController.putItens(req, res));

router.delete('/itens/:codigo', (req, res) => itensController.deleteItens(req, res));

//produtos
router.get('/produtos', (req, res) => produtosController.getProdutos(req, res));

router.post('/produtos', (req, res) => produtosController.postProdutos(req, res));

router.put('/produtos/:codigo', (req, res) => produtosController.putProdutos(req, res));

router.delete('/produtos/:codigo', (req, res) => produtosController.deleteProdutos(req, res));

//Vendas
router.get('/vendas', (req, res) => vendasController.getVendas(req, res));

router.post('/vendas', (req, res) => vendasController.postVendas(req, res));

router.delete('/vendas/:codigo', (req, res) => vendasController.deleteVendas(req, res));

//Fornecedores

router.get('/fornecedores', (req, res) => forncedoresController.getFornecedores(req, res));

router.post('/fornecedores', (req, res) => forncedoresController.postFornecedores(req, res));

router.put('/fornecedores/:codigo', (req, res) => forncedoresController.putFornecedores(req, res));

router.delete('/fornecedores/:codigo', (req, res) => forncedoresController.deleteFornecedores(req, res));

//Funcionarios

router.get('/funcionarios', (req, res) => funcionariosController.getFuncionarios(req, res));

router.post('/funcionarios', (req, res) => funcionariosController.postFuncionarios(req, res));

router.put('/funcionarios/:codigo', (req, res) => funcionariosController.putFuncionarios(req, res));

router.delete('/funcionarios/:codigo', (req, res) => funcionariosController.deleteFuncionarios(req, res));

//backup

router.post('/backup', (req, res) => backup.realizarBackup(req, res));

module.exports = router;