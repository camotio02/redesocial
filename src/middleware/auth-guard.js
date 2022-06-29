
import LocalStorageService from '../utils/local-storage-service'

export default class AuthGuard {
  static estaLogado () {
    let authData = LocalStorageService.getUserData()

    console.log(authData)

    if (authData !== null) return true

    return false
  }
}
