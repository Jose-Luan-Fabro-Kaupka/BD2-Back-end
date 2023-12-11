const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');
const { where } = require('sequelize');

exports.itensCriar = async (dados) => {
    const novoItem = await db.itens.create(dados);
    return novoItem;
}

exports.itensEditar = async (dados) => {
    const item = await db.itens.findByPk(dados.codigo);

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

exports.itensConsultar = async () => {
    try {
      const itens = await db.itens.findAll({
        include: [
          {
            model: db.produtos,
            as: 'produtos'
          },
          {
            model: db.vendas,
            as: 'venda',
            include: [
              {
                model: db.funcionarios,
                as: 'funcionarios',
                attributes: ['codigo', 'nome']
              },
            ],
          },
        ],
      });
  
      return itens;
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      throw new Error('Erro ao buscar itens. Detalhes no console.');
    }
};
  

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
