const Sequelize = require('sequelize');
const config = require('../../config/config.js');
const db = require('../../config/sequelize_db');

const sequelize = new Sequelize(config.server.dbName, config.server.user, config.server.password, {
  host: config.server.host,
  dialect: 'postgres',
});

const start = async () => {
  try {
    await sequelize.authenticate();

    //Depois de criar as tabelas, comente esse trecho
    for (const key in db) {
      if (db[key].sync) {
        const model = db[key];
        const tableExists = await model.sync({force: false});

        if(!tableExists){
          await db[key].sync({force: true});
        }
        console.log(`Tabela para ${key} sincronizada.`);
      }
    }

  } catch (error) {
    console.error('Falha na conexão: ', error);
  }
};

const stop = async () => {
  try {
    await sequelize.close();
    console.log('Conexão fechada.');
  } catch (error) {
    console.error('Erro ao fechar conexão:', error);
  }
};

module.exports = {
  sequelize: sequelize,
  db: db,
  start: start,
  stop: stop
};
