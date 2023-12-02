const logger = require('./logger');

exports.sendRensponse = (res, statusCode, erro, mensagem, dados) => {
    let response = {
       error: erro ? true : false,
       message: mensagem
    }

    if(dados){
        response.data = dados
    }

    logger.trace('Retorno: ' + statusCode + '. ' + JSON.stringify(response))

    return res.status(statusCode).json(response);
}