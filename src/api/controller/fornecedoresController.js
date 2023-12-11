const classFornecedores = require('../class/fornecedores')
const responses = require('../helper/responses')

exports.postFornecedores = async (req, res) => {
  const { nome } = req.body

  if (!nome) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }
  
  const dados = {nome}

  const result = await classFornecedores.fornecedoresCriar(dados)
  return responses.sendResponse(res, 201, false, 'Fornecedor criado com sucesso.', result)
}

exports.putFornecedores = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  const { nome } = req.body

  const dados = { codigo, descricao}

  const result = await classFornecedores.fornecedoresEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getFornecedores = async (req, res) => {
  try{
    const result = await classFornecedores.fornecedoresConsultar()
    return responses.sendResponse(res, 200, false, 'OK.', result)
  } catch(erro){
      return responses.sendResponse(res, 500, true, 'Erro ao buscar fornecedores.', null);
  }
}

exports.deleteFornecedores = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  await classFornecedores.fornecedoresDeletar(codigo)

  return responses.sendResponse(res, 204, false, 'Fornecedor eliminado com sucesso.', null)
}
