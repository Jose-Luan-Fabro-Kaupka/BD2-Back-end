const { exec } = require('child_process');
const config = require('../../config/config.js');
const responses = require('../helper/responses.js');

function realizarBackup(req, res) {
  const dbName = config.server.dbName;
  const backupFileName = 'backup.sql';

  const command = `PGPASSWORD=${process.env.POSTGRES_PASS} pg_dump -U ${process.env.POSTGRES_USER} -d ${dbName} > ${backupFileName}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Erro ao executar o comando pg_dump:', error);
      return responses.sendResponse(res, 500, true, 'Falha ao realizar backup', null);
    }
    if (stderr) {
      console.error('Erro stderr ao executar o comando pg_dump:', stderr);
      return responses.sendResponse(res, 500, true, 'Falha ao realizar backup', null);
    }
    console.log('Backup realizado com sucesso');
    return responses.sendResponse(res, 200, false, 'Backup realizado com sucesso', null);
  });
}

module.exports = { realizarBackup };
