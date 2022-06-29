<template>
  <div class="tela">
    <div class="contain">
      <h1>Faça o seu Login</h1>
      <div class="image">
        <img src="@/assets/pateta.png" class="" alt="ama" />
      </div>
      <div class="inputItem">
        <p>Email:</p>
        <input type="email" class="input" id="email" v-model="emailDoUsuario"
          placeholder="Informe o seu Email por favor" />
      </div>
      <div class="inputItem">
        <p>password:</p>
        <input type="password" class="input" id="password" v-model="senhaDoUsuario"
          placeholder="informe o seu password/senha." />
      </div>
      <b-alert :show="mostraErro" variant="warning" class="alert">
        {{ mensagemDeErro }}
      </b-alert>
      <div class="btnsDiv">
        <button type="button" class="btn1" @click="entrar()">
          Login
        </button>
        <button type="button" class="btn1" @click="novoUsuario()">
          Catasdro
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user-service'
import LocalStorageService from '../../utils/local-storage-service'
import router from '../../router'

export default {
  name: 'Login',
  data() {
    return {
      mostraErro: false,
      mensagemDeErro: '',
      emailDoUsuario: '',
      senhaDoUsuario: ''
    }
  },
  methods: {
    entrar() {
      if (this.emailDoUsuario === '') {
        this.mensagemDeErro = 'O campo do Emeil não foi informado!!'
        this.mostraErro = true
        setTimeout(() => {
          this.mostraErro = false
        }, 2000)
        return
      }

      if (this.senhaDoUsuario === '') {
        this.mensagemDeErro = 'O campo do Password não foi informado!!'
        this.mostraErro = true
        setTimeout(() => {
          this.mostraErro = false
        }, 2000)
        return
      }

      UserService.login(this.emailDoUsuario, this.senhaDoUsuario)
        .then(response => {
          if (response.status === 200) {
            this.loginData = response.data
            LocalStorageService.setUserData(this.loginData)
            router.push({ name: 'Home' })
          } else {
            this.mensagemDeErro = 'Ocorreu um erro no sistema. Cabeção!'
            this.mostraErro = true
            setTimeout(() => {
              this.mostraErro = false
            }, 3000)
          }
        })
        .catch(error => {
          console.log(error)
          this.mensagemDeErro = 'Ocorreu um erro no sistema. Cabeção!'
          this.mostraErro = true
          setTimeout(() => {
            this.mostraErro = false
          }, 3000)
        })
    },
    novoUsuario() {
      router.push({ name: 'Cadastro' })
    }
  }
}
</script>

<style scoped>
.tela {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.contain {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 25rem;
  height: 40rem;
  box-shadow: 10px 5px 5px black;
  border: 2px solid black;
  padding-block: 25px;
}

h1 {
  text-transform: uppercase;
  color: forestgreen;
}

.image,
img {
  width: 15rem;
  height: 13rem;
  background-color: #fff;
}

.inputItem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 5rem;
  padding-inline: 15px;
}

p {
  color: darkred;
}

.input {
  width: 100%;
  height: 3rem;
  margin-top: -1rem;
  background-color: transparent;
  border-bottom: 1px solid black !important;
  border: none;
  outline: none;
}

.input::placeholder {
  padding-left: 15px;
  color: rgb(141, 126, 104);
}

.btnsDiv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: pink;
  width: 95%;
  height: 3rem;
  border-radius: 2rem;
  gap: 2rem;
  color: #fff;
  border: 1px solid darkgreen;
  
}
.btn1 {
  width: 50%;
  
  border: none;
  text-transform: uppercase;
  color: rgb(25, 15, 15);
  outline: none;
  background-color: transparent;
}
.alert {
  background-color: #fff;
  border: none;
  width: 100%;
  height: 1.5rem;
}
</style>
