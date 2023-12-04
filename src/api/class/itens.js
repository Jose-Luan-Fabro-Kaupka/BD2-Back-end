const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.itensCriar = async (dados) => {
    const novoItem = await db.itens.create(dados);
    return novoItem;
}

exports.itensEditar = async (dados) => {
    const item = await db.findByPk(dados.codigo);

    if(!item){
        throw new APIError(404, 'Item não encontrado', undefined);
    }

    const dadosAtualizar = {}

    if(dados.descricao){
        dadosAtualizar.descricao = dados.descricao;
    }

    await db.itens.update(dadosAtualizar, {
        where: {
            codigo: dados.codigo
        }
    })

    const itemAtualizado = db.itens.findByPk(dados.codigo);

    return itemAtualizado;
}

exports.itensConsultar = async (dados) => {
    const codigo = dados

    const item = await db.itens.findByPk(codigo);

    if(!item){
        throw new APIError(404, 'Item não encontrado', undefined);
    }

    return item;
}

exports.itensDeletar = async (dados) => {
    const codigo =  dados

    const item = await db.itens.findByPk(codigo);

    if(!item){
        throw new APIError(404, 'Item não encontrado', undefined);
    }

    await db.itens.destroy({
        where: {
            codigo: codigo
        }
    })
}
