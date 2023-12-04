const classProdutos = require('../class/produtos.js')
const responses = require('../helper/responses')

exports.postProdutos = async (req, res) => {
  const {descricao, valor, quantidade} = req.body

  if (!descricao || !valor || !quantidade) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {descricao, valor, quantidade}

  const result = await classProdutos.produtosCriar(dados)
  return responses.sendResponse(res, 201, false, 'Produto criado com sucesso.', result)
}

exports.putProdutos = async (req, res) => {
  const { codigo } = req.params;

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  const { descricao, valor, quantidade } = req.body

  const dados = { codigo, descricao, valor, quantidade }

  const result = await classProdutos.produtosEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getProdutos = async (req, res) => {
  const { codigo } = req.params;

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  const result = await classProdutos.produtosConsultar(codigo)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteProdutos = async (req, res) => {
  const { codigo } = req.params;

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  await classProdutos.produtosDeletar(codigo)

  return responses.sendResponse(res, 204, false, 'Produto eliminado com sucesso.', null)
}
