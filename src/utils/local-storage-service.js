export default class LocalStorageService {
  static setUserData (data) {
    localStorage.setItem('user', JSON.stringify(data))
  }

  static getUserData () {
    var data = localStorage.getItem('user')
    return JSON.parse(data)
  }

  static removeUserData () {
    localStorage.removeItem('user')
  }
}
