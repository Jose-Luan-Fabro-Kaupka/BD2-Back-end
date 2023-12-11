const express = require('express');
const responses = require('../helper/responses.js');
const router = express.Router();

const postLogin = (req, res) => {
    const {login, senha} = req.body;
  
    if(!login){
        responses.sendResponse(res, 400, true, "login não informado", null);
    }
  
    if(!senha){
        responses.sendResponse(res, 400, true, "senha não informada", null);
    }

    guardarLogin = login;
    guardarSenha = senha;
}

const getLogin = () => {
    return guardarLogin;
}

const getSenha = () => {
    return guardarSenha;
}

module.exports = {
    getLogin,
    getSenha
}