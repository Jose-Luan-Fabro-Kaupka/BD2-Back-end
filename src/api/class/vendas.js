const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.vendasCriar = async (dados) => {
    const novaVenda = await db.vendas.create(dados);
    return novaVenda;
}

exports.vendasEditar = async (dados) => {
    const venda = await db.findByPk(dados.id);

    if(!venda){
        throw new APIError(404, 'Venda não encontrada', undefined);
    }

    const dadosAtualizar = {}

    if(dados.descricao){
        dadosAtualizar.descricao = dados.descricao;
    }

    await db.vendas.update(dadosAtualizar, {
        where: {
            id: dados.id
        }
    })

    const vendaAtualizada = db.vendas.findByPk();

    return vendaAtualizada;
}

exports.vendasConsultar = async (dados) => {
    const venda = await db.vendas.findByPk(id);

    if(!venda){
        throw new APIError(404, 'Venda não encontrada', undefined);
    }

    return venda;
}

exports.vendasDeletar = async (dados) => {
    const venda = await db.vendas.findByPk(id);

    if(!venda){
        throw new APIError(404, 'Venda não encontrada', undefined);
    }

    await db.vendas.destroy({
        where: {
            id: id
        }
    })
}