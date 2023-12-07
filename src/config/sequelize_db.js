const Sequelize = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.server.dbName, config.server.user, config.server.password, {
  host: config.server.host,
  dialect: 'postgres'
})

var db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize



db.vendas = require('../api/model/vendas')(sequelize, Sequelize)
db.funcionarios = require('../api/model/funcionarios')(sequelize, Sequelize)
db.produtos = require('../api/model/produtos')(sequelize, Sequelize)
db.fornecedores = require('../api/model/fornecedores')(sequelize, Sequelize)
db.itens = require('../api/model/itens')(sequelize, Sequelize)



db.vendas.belongsTo(db.funcionarios, {
  as: 'funcionarios',
  foreignKey: 'funcionarios_cod',
});

db.itens.belongsTo(db.vendas, {
  as: 'venda',
  foreignKey: 'vendas_cod',
});

db.vendas.hasMany(db.itens, {
  as: 'itens',
  foreignKey: 'vendas_cod',
});

db.produtos.belongsTo(db.fornecedores, {
  as: 'fornecedores',
  foreignKey: 'fornecedores_cod',
});

db.itens.belongsTo(db.produtos, {
  as: 'produtos',
  foreignKey: 'produtos_cod',
});

db.itens.belongsTo(db.funcionarios, {
  as: 'funcionarios',
  foreignKey: 'funcionarios_cod',
});

module.exports = db;