import api from './api'

export default class MessageService {
  static retornaTodasMensagens () {
    var endpoint = '/mensagens'

    try {
      const response = api.get(endpoint)
      return response
    } catch (error) {
      return error
    }
  }

  static novaMensagem (usuarioId, mensagem) {
    var endpoint = '/mensagem'

    let data = {
      usuario_id: usuarioId,
      mensagem: mensagem
    }

    try {
      const response = api.post(endpoint, data)
      return response
    } catch (error) {
      return error
    }
  }
}
