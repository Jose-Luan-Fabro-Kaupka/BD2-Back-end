const logger = require('../helper/logger');
const db = require('../../config/sequelize_db');
const APIError = require('../errors/api.error');

exports.vendasCriar = async (dados) => {
    
    const novaVenda = await db.vendas.create(dados);
    return novaVenda;
}

exports.vendasConsultar = async () => {
    try {
      const vendas = await db.vendas.findAll({
        include: [
          {
            model: db.itens,
            as: 'itens',
            include: [
              {
                model: db.produtos,
                as: 'produtos',
                attributes: ['codigo', 'descricao', 'valor', 'quantidade']
              }
            ],
            attributes: ['codigo', 'quantidade', 'valor_parcial']
          }
        ],
        attributes: ['codigo', 'horario'], // Remova 'valor_total' daqui
        raw: true, // Para obter os resultados como objetos JavaScript simples
      });
  
      // Calcular o valor total para cada venda
      const vendasComValorTotal = await Promise.all(vendas.map(async (venda) => {
        const valorTotal = await db.itens.sum('valor_parcial', {
          where: {
            vendas_cod: venda.codigo, // Filtra os itens pela venda específica
          },
          raw: true,
        });
  
        return {
          ...venda,
          valor_total: valorTotal || 0, // Define o valor total da venda
        };
      }));
  
      return vendasComValorTotal;
    } catch (error) {
      throw new APIError(500, 'Erro ao buscar vendas.', error);
    }
  };
  
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