const classVendas = require('../class/vendas')
const responses = require('../helper/responses')

exports.postVendas = async (req, res) => {
  const {horario, valor_total, funcionarios_cod} = req.body

  if (!horario || !valor_total || !funcionarios_cod) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {horario, valor_total, funcionarios_cod}

  const result = await classVendas.vendasCriar(dados)
  return responses.sendResponse(res, 201, false, 'Venda criada com sucesso.', result)
}

exports.putVendas = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

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

  const dados = {codigo, valor_total}

  const result = await classVendas.vendasEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getVendas = async (req, res) => {
  const result = await classVendas.vendasConsultar()
  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.deleteVendas = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  await classVendas.vendasDeletar(codigo)

  return responses.sendResponse(res, 204, false, 'Venda eliminada com sucesso.', null)
}
