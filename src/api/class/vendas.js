const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.vendasCriar = async (dados) => {
    const novaVenda = await db.vendas.create(dados);
    return novaVenda;
}

exports.vendasEditar = async (dados) => {
    const venda = await db.vendas.findByPk(dados.codigo);

    if(!venda){
        throw new APIError(404, 'Venda não encontrada', undefined);
    }

    const dadosAtualizar = {}

    if(dados.valor_total){
        dadosAtualizar.valor_total = dados.valor_total;
    }

    if(dados.funcionarios_cod){
        dadosAtualizar.funcionarios_cod = dados.funcionarios_cod;
    }

    await db.vendas.update(dadosAtualizar, {
        where: {
            codigo: dados.codigo
        }
    })

    const vendaAtualizada = db.vendas.findByPk(dados.codigo);

    return vendaAtualizada;
}

exports.vendasConsultar = async (dados) => {
    const codigo = dados

    const venda = await db.vendas.findByPk(codigo);

    if(!venda){
        throw new APIError(404, 'Venda não encontrada', undefined);
    }

    return venda;
}

exports.vendasDeletar = async (dados) => {
    const codigo = dados

    const venda = await db.vendas.findByPk(codigo);

    if(!venda){
        throw new APIError(404, 'Venda não encontrada', undefined);
    }

    await db.vendas.destroy({
        where: {
            codigo: codigo
        }
    })
}