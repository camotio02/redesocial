import api from './api'
import LocalStorageService from '../utils/local-storage-service'

export default class UserService {
  static login (email, password) {
    var endpoint = '/usuario/login'

    const data = {
      usuario_email: email,
      usuario_senha: password
    }

    try {
      const response = api.post(endpoint, data)
      return response
    } catch (error) {
      return error
    }
  }

  static cadastroUsuario (nome, email, password) {
    var endpoint = '/usuario'

    const data = {
      usuario_nome: nome,
      usuario_email: email,
      usuario_senha: password
    }

    try {
      const response = api.post(endpoint, data)
      return response
    } catch (error) {
      return error
    }
  }

  static trocarSenha (usuarioId, senhaAtual, novaSenha) {
    var endpoint = '/usuario/trocar-senha'

    const data = {
      usuario_id: usuarioId,
      usuario_senha: senhaAtual,
      nova_senha: novaSenha
    }

    try {
      const response = api.post(endpoint, data)
      return response
    } catch (error) {
      return error
    }
  }

  static logout () {
    LocalStorageService.removeUserData()
  }
}
