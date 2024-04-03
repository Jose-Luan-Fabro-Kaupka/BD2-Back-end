const classItens = require('../class/itens')
const responses = require('../helper/responses')

exports.postItens = async (req, res) => {
  const {quantidade, valor_parcial, vendas_cod, produtos_cod} = req.body

  if (!quantidade || !valor_parcial || !vendas_cod || !produtos_cod) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }

  const dados = {quantidade, valor_parcial, vendas_cod, produtos_cod}

  const result = await classItens.itensCriar(dados)
  return responses.sendResponse(res, 201, false, 'Item criado com sucesso.', result)
}

exports.putItens = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  const { quantidade, valor_parcial} = req.body

  const dados = { codigo, descricao}

  const result = await classItens.itensEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getItens = async (req, res) => {
  try{
    const result = await classItens.itensConsultar(req.params)
    return responses.sendResponse(res, 200, false, 'OK.', result)
  } catch(erro){
      {
        return responses.sendResponse(res, 500, true, 'Erro ao buscar itens.', null);
      }
  }
}

exports.deleteItens = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  await classItens.itensDeletar(codigo)

  return responses.sendResponse(res, 200, false, 'Item eliminado com sucesso.', null)
}
