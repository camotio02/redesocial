<template>
  <div class="bg-primary">
    <div class="container">
      <b-navbar toggleable="lg" type="dark" variant="bg-primary">
        <b-navbar-brand href="#">REDE SOCIAL <strong>EVORA.NET.BR</strong></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ userName }}</em>
              </template>
              <b-dropdown-item @click="trocarSenha()">Trocar Senha</b-dropdown-item>
              <b-dropdown-item @click="outraseccao()">Home</b-dropdown-item>
              <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import LocalStorageService from '../utils/local-storage-service'
import UserService from '../services/user-service'
import router from '../router'
export default {
  name: 'BarraNavegacao',
  data() {
    return {
      userName: ''
    }
  },
  mounted() {
    const userData = LocalStorageService.getUserData()
    if (userData) {
      this.userName = userData.usuario_nome
    }
  },
  methods: {
    logout() {
      UserService.logout()
      router.push({ name: 'Login' })
    },
    trocarSenha() {
      router.push({ name: 'TrocarSenha' })
    }
  }
}
</script>
<style scoped>

</style>
