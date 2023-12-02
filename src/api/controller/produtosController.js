const classProdutos = require('../class/produtos.js')
const responses = require('../helper/responses')

exports.postProdutos = async (req, res) => {
  const {quantidade, valor_parcial} = req.body

  if (!quantidade || !valor_parcial) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {quantidade, valor_parcial}

  const result = await classProdutos.produtosCriar(dados)
  return responses.sendResponse(res, 201, false, 'Produto criado com sucesso.', result)
}

exports.putProdutos = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const { quantidade, valor_parcial } = req.body

  const dados = { id, descricao }

  const result = await classProdutos.produtosEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getProdutos = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classProdutos.produtosConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteProdutos = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  await classProdutos.produtosDeletar(id)

  return responses.sendResponse(res, 204, false, 'Produto eliminado com sucesso.', null)
}
