const classVendas = require('../class/vendas')
const responses = require('../helper/responses')

exports.postVendas = async (req, res) => {
  const {funcionarios_cod} = req.body

  const horario = new Date();

  if (!funcionarios_cod) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {horario, funcionarios_cod}

  const result = await classVendas.vendasCriar(dados)
  return responses.sendResponse(res, 201, false, 'Venda criada com sucesso.', result)
}


exports.getVendas = async (req, res) => {
  try{
    const result = await classVendas.vendasConsultar()
    return responses.sendResponse(res, 200, false, 'OK.', result)
  } catch(erro){
    return responses.sendResponse(res, 500, true, 'Erro ao buscar vendas.', null);
  }
}

exports.deleteVendas = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  await classVendas.vendasDeletar(codigo)

  return responses.sendResponse(res, 204, false, 'Venda eliminada com sucesso.', null)
}
