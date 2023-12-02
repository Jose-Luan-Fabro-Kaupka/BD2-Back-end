const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.produtosCriar = async (dados) => {
    const novoItem = await db.produtos.create(dados);
    return novoItem;
}

exports.produtosEditar = async (dados) => {
    const item = await db.findByPk(dados.id);

    if(!item){
        throw new APIError(404, 'Produto não encontrado', undefined);
    }

    const dadosAtualizar = {}

    if(dados.descricao){
        dadosAtualizar.descricao = dados.descricao;
    }

    await db.produtos.update(dadosAtualizar, {
        where: {
            id: dados.id
        }
    })

    const itemAtualizado = db.produtos.findByPk();

    return itemAtualizado;
}

exports.produtosConsultar = async (dados) => {
    const item = await db.produtos.findByPk(id);

    if(!item){
        throw new APIError(404, 'Item não encontrado', undefined);
    }

    return item;
}

exports.produtosDeletar = async (dados) => {
    const item = await db.produtos.findByPk(id);

    if(!item){
        throw new APIError(404, 'Produto não encontrado', undefined);
    }

    await db.produtos.destroy({
        where: {
            id: id
        }
    })
}
