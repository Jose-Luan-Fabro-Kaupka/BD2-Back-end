const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.funcionariosCriar = async (dados) => {
    const novofuncionario = await db.funcionarios.create(dados);
    return novofuncionario;
}

exports.funcionariosEditar = async (dados) => {
    const funcionario = await db.funcionarios.findByPk(dados.codigo);

    if(!funcionario){
        throw new APIError(404, 'funcionario não encontrado', undefined);
    }

    const dadosAtualizar = {}

    if(dados.descricao){
        dadosAtualizar.descricao = dados.descricao;
    }

    await db.funcionarios.update(dadosAtualizar, {
        where: {
            codigo: dados.codigo
        }
    })

    const funcionarioAtualizado = db.funcionarios.findByPk(dados.codigo);

    return funcionarioAtualizado;
}

exports.funcionariosConsultar = async () => {
    const funcionario = await db.funcionarios.findAll();
    return funcionario;
}

exports.funcionariosDeletar = async (dados) => {
    const codigo =  dados

    const funcionario = await db.funcionarios.findByPk(codigo);

    if(!funcionario){
        throw new APIError(404, 'funcionario não encontrado', undefined);
    }

    await db.funcionarios.destroy({
        where: {
            codigo: codigo
        }
    })
}
