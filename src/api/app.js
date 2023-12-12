const express = require('express');
const db = require('./model/db.js');
const routes = require('./routes/router.js');
const responses = require('./helper/responses.js');
const cors = require('cors');

const app = express();
const credentials = {}; // Objeto para armazenar as credenciais

app.use(cors({
  origin: 'http://127.0.0.1:5500',
}));

app.use(express.json());

app.use('/api', routes);

app.post('/autenticar', (req, res) => {
  const { user, senha } = req.body;

  credentials.user = user; // Armazena o usuário recebido
  credentials.senha = senha; // Armazena a senha recebida

  responses.sendResponse(res, 200, false, 'OK.', [user, senha]);
});

db.start(credentials) // Inicia o banco de dados passando as credenciais
  .then(() => {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao iniciar o banco de dados:', error);
  });
