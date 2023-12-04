const express = require('express');
const db = require('./model/db.js');
const routes = require('./routes/router.js');

const app = express();

app.use(express.json());

app.use('/api', routes); 

db.start().then(() => {
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao iniciar o banco de dados:', error);
});

// db.stop();
