const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.produtosCriar = async (dados) => {
    const novoProduto = await db.produtos.create(dados);
    return novoProduto;
}

exports.produtosEditar = async (dados) => {
    const produto = await db.produtos.findByPk(dados.codigo);

    if(!produto){
        throw new APIError(404, 'Produto não encontrado', undefined);
    }

    const dadosAtualizar = {}

    if(dados.descricao){
        dadosAtualizar.descricao = dados.descricao;
    }

    if(dados.valor){
        dadosAtualizar.valor = dados.valor;
    }

    if(dados.quantidade){
        dadosAtualizar.quantidade = dados.quantidade;
    }

    await db.produtos.update(dadosAtualizar, {
        where: {
            codigo: dados.codigo
        }
    })

    const produtoAtualizado = db.produtos.findByPk();

    return produtoAtualizado;
}

exports.produtosConsultar = async () => {
    const produto = await db.produtos.findAll();

    if(!produto){
        throw new APIError(404, 'produto não encontrado', undefined);
    }

    return produto;
}

exports.produtosDeletar = async (dados) => {
    const codigo = dados;

    const produto = await db.produtos.findByPk(codigo);

    if(!produto){
        throw new APIError(404, 'Produto não encontrado', undefined);
    }

    await db.produtos.destroy({
        where: {
            codigo: codigo
        }
    })
}
