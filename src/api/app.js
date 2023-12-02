const express = require('express');
const db = require('./model/db.js');
const routes = require('./routes/router.js');

const app = express();

app.use('/api', routes); 

// Inicializa a conexão com o banco de dados ao iniciar o servidor
db.start().then(() => {
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao iniciar o banco de dados:', error);
});

// Se você precisar interromper a conexão com o banco de dados em algum momento, pode fazer chamando db.stop()
// db.stop();
