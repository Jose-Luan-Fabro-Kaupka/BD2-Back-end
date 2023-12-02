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
    console.log('Connection has been established successfully.');

    //Depois de criar as tabelas, comente esse trecho
    for (const key in db) {
      if (db[key].sync) {
        await db[key].sync({force: true});
        console.log(`Table for ${key} synchronized successfully.`);
      }
    }

    //Descomente depois de criar as tabelas

    /*
    for (const key in db) {
      if (db[key].sync) {
        await db[key].sync();
        console.log(`Table for ${key} synchronized successfully.`);
      }
    }
    */

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const stop = async () => {
  try {
    await sequelize.close();
    console.log('Connection to the database has been closed.');
  } catch (error) {
    console.error('Error closing connection:', error);
  }
};

module.exports = {
  sequelize: sequelize,
  db: db,
  start: start,
  stop: stop
};
