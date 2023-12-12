const express = require('express');
const db = require('./model/db.js');
const routes = require('./routes/router.js');
const responses = require('./helper/responses.js');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
}));

app.use(express.json());

app.use('/api', routes); 

app.post('/autenticar', (req, res) => {
  const { user, senha } = req.body;

  process.env.POSTGRES_USER = user;
  process.env.POSTGRES_PASS = senha;

  responses.sendResponse(res, 200, false, 'OK.', [user, senha])
});

db.start().then(() => {
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao iniciar o banco de dados:', error);
});

// db.stop();
