const classFuncionarios = require('../class/funcionarios')
const responses = require('../helper/responses')

exports.postFuncionarios = async (req, res) => {
  const { nome, cpf, senha, funcao } = req.body

  if (!nome || !cpf || !senha || !funcao) {
    return responses.sendResponse(res, 400, true, 'Campos obrigatórios não informados.', null)
  }
  
  const dados = {nome, cpf, senha, funcao}

  const result = await classFuncionarios.funcionariosCriar(dados)
  return responses.sendResponse(res, 201, false, 'Item criado com sucesso.', result)
}

exports.putFuncionarios = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  const { nome, cpf, senha, funcao } = req.body

  const dados = {nome, cpf, senha, funcao}

  const result = await classFuncionarios.funcionariosEditar(dados)

  return responses.sendResponse(res, 200, false, 'OK.', result)
}

exports.getFuncionarios = async (req, res) => {
  try{
    const result = await classFuncionarios.funcionariosConsultar()
    return responses.sendResponse(res, 200, false, 'OK.', result)
  } catch(erro){
    return responses.sendResponse(res, 500, true, 'Erro ao buscar funcionários.', null);
  }
}

exports.deleteFuncionarios = async (req, res) => {
  const { codigo } = req.params

  if (!codigo) {
    return responses.sendResponse(res, 400, true, 'Código não informado.', null)
  }

  await classFuncionarios.funcionariosDeletar(codigo)

  return responses.sendResponse(res, 204, false, 'Item eliminado com sucesso.', null)
}
