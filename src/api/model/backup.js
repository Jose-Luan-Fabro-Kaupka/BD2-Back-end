const { exec } = require('child_process');
const config = require('../../config/config.js');
const responses = require('../helper/responses.js');

function realizarBackup(req, res) {
  const dbName = config.server.dbName;
  const dbUser = config.server.user;
  const dbPassword = config.server.password;
  const backupFileName = 'backup.sql';

  const command = `pg_dump -U ${dbUser} -d ${dbName} > ${backupFileName}`;

exec(command, (error, stdout, stderr) => {
    if (error) {

        return responses.sendResponse(res, 500, true, 'Falha ao realizar backup', null);
    }
    if (stderr) {
        return responses.sendResponse(res, 500, true, 'Falha ao realizar backup', null);
    }
    return responses.sendResponse(res, 200, false, 'Backup realizado com sucesso', null);
    });
}

module.exports = { realizarBackup };
