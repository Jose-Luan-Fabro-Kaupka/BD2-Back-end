const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.fornecedoresCriar = async (dados) => {
    const novoFornecedor = await db.fornecedores.create(dados);
    return novoFornecedor;
}

exports.fornecedoresEditar = async (dados) => {
    const fornecedor = await db.fornecedores.findByPk(dados.codigo);

    if(!fornecedor){
        throw new APIError(404, 'Fornecedor não encontrado', undefined);
    }

    const dadosAtualizar = {}

    if(dados.descricao){
        dadosAtualizar.descricao = dados.descricao;
    }

    await db.fornecedores.update(dadosAtualizar, {
        where: {
            codigo: dados.codigo
        }
    })

    const fornecedorAtualizado = db.fornecedores.findByPk(dados.codigo);

    return fornecedorAtualizado;
}

exports.fornecedoresConsultar = async () => {
    const fornecedor = await db.fornecedores.findAll();

    return fornecedor;
}

exports.fornecedoresDeletar = async (dados) => {
    const codigo =  dados

    const fornecedor = await db.fornecedores.findByPk(codigo);

    if(!fornecedor){
        throw new APIError(404, 'Fornecedor não encontrado', undefined);
    }

    await db.fornecedores.destroy({
        where: {
            codigo: codigo
        }
    })
}
