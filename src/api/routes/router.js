const express = require('express');
const router = express.Router();
const itensController = require('../controller/itensController');
const produtosController = require('../controller/produtosController');
const vendasController = require('../controller/vendasController');

//Itens
router.get('/itens/:codigo', (req, res) => itensController.getItens(req, res));

router.post('/itens', (req, res) => itensController.postItens(req, res));

router.put('/itens/:codigo', (req, res) => itensController.putItens(req, res));

router.delete('/itens/:codigo', (req, res) => itensController.deleteItens(req, res));

//produtos
router.get('/produtos/:codigo', (req, res) => produtosController.getProdutos(req, res));

router.post('/produtos', (req, res) => produtosController.postProdutos(req, res));

router.put('/produtos/:codigo', (req, res) => produtosController.putProdutos(req, res));

router.delete('/produtos/:codigo', (req, res) => produtosController.deleteProdutos(req, res));

//Vendas
router.get('/vendas/:codigo', (req, res) => vendasController.getVendas(req, res));

router.post('/vendas', (req, res) => vendasController.postVendas(req, res));

router.put('/vendas/:codigo', (req, res) => vendasController.putVendas(req, res));

router.delete('/vendas/:codigo', (req, res) => vendasController.deleteVendas(req, res));

module.exports = router;