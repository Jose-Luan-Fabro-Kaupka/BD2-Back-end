const classItens = require('../class/itens')
const responses = require('../helper/responses')

exports.postItens = async (req, res) => {
  const {quantidade, valor_parcial} = req.body

  if (!quantidade || !valor_parcial) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {quantidade, valor_parcial}

  const result = await classItens.itensCriar(dados)
  return responses.sendResponse(res, 201, false, 'Item criado com sucesso.', result)
}

exports.putItens = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const { quantidade, valor_parcial } = req.body

  const dados = { id, descricao }

  const result = await classItens.itensEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getItens = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classItens.itensConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteItens = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  await classItens.itensDeletar(id)

  return responses.sendResponse(res, 204, false, 'Item eliminado com sucesso.', null)
}
