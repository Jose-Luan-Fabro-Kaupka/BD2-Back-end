const classVendas = require('../class/vendas')
const responses = require('../helper/responses')

exports.postVendas = async (req, res) => {
  const {horario, valor_total} = req.body

  if (!horario || !valor_total) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {horario, valor_total}

  const result = await classVendas.vendasCriar(dados)
  return responses.sendResponse(res, 201, false, 'Venda criada com sucesso.', result)
}

exports.putVendas = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }x

  const {horario, valor_total} = req.body

  if (horario) {
    return responses.sendResponse(
      res,
      400,
      true,
      'Não é permitido alterar o horário.',
      null
    )
  }

  const dados = {id, valor_total}

  const result = await classVendas.vendasEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getVendas = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  const result = await classVendas.vendasConsultar(id)
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteVendas = async (req, res) => {
  const { id } = req.query

  if (!id) {
    return responses.sendResponse(res, 400, true, 'Id não informado.', null)
  }

  await classVendas.vendasDeletar(id)

  return responses.sendResponse(res, 204, false, 'Venda eliminada com sucesso.', null)
}
