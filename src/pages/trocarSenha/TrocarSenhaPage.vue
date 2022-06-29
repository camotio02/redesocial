<template>
  <div class="tela">
    <BarraNavegacao></BarraNavegacao>
    <div class="rows">
      <div class="h1">
        <h2>Nova senha</h2>
      </div>

      <div class="inputsenhaantigo">
        <img class="img" src="../../assets/senhas (1).png" alt="">
        <input type="password" class="sona" id="password" v-model="senhaDoUsuario" placeholder="Senha Atual" />
      </div>

      <div class="inputsenhaantigo">
        <img class="img" src="../../assets/5532031.png" alt="">
        <input type="password" class="sona" id="novasenha" v-model="novaSenha" placeholder="Nova senha" />
      </div>


      <b-alert :show="mostraErro" variant="warning" class="inputsenhaantigo">
        {{ mensagemDeErro }}
      </b-alert>
      <div class="inputsenhaantigo">
        <img class="img" src="../../assets/6195699.png" alt="">
        <button type="button" class="sona" @click="atualizarSenha()">
          Atualizar senha
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BarraNavegacao from '../../components/BarraNavegacao.vue'
import UserService from '../../services/user-service'
import LocalStorageService from '../../utils/local-storage-service'
import router from '../../router'

export default {
  name: 'TrocarSenha',
  components: {
    BarraNavegacao
  },
  data() {
    return {
      mostraErro: false,
      mensagemDeErro: '',
      novaSenha: '',
      senhaDoUsuario: ''
    }
  },
  mounted: function () {
  },
  methods: {
    atualizarSenha() {
      if (this.senhaDoUsuario === '') {
        this.mensagemDeErro = 'Senha atual inválida'
        this.mostraErro = true
        setTimeout(() => {
          this.mostraErro = false
        }, 2000)
        return
      }

      if (this.novaSenha === '') {
        this.novaSenha = 'Nova senha inválida'
        this.mostraErro = true
        setTimeout(() => {
          this.mostraErro = false
        }, 2000)
        return
      }

      const userData = LocalStorageService.getUserData()

      let usuarioId = userData.usuario_id;

      UserService.trocarSenha(usuarioId, this.senhaDoUsuario, this.novaSenha)
        .then(response => {
          if (response.status === 200) {

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



    }
  }
}
</script>

<style scoped>
.tela {
  width: 100%;
  height: 100vh;
}
.rows {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-inline: auto;
  gap: 2rem;
  width: 70%;
  height: 70%;
  margin-top: 5rem;
  border: 1px solid black;
  box-shadow: 
  rgb(215, 207, 207) 0px 0px 0px 2px inset, 
  rgb(255, 255, 255) 10px -10px 0px -3px, 
  rgb(215, 207, 207) 10px -10px, 
  rgb(255, 255, 255) 20px -20px 0px -3px, 
  rgb(215, 207, 207) 20px -20px, 
  rgb(255, 255, 255) 30px -30px 0px -3px, 
  rgb(215, 207, 207) 30px -30px, 
  rgb(255, 255, 255) 40px -40px 0px -3px, 
  rgb(215, 207, 2078) 40px -40px;
}
h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  color: rgba(234, 125, 17, 0.743);
  margin-top: 2rem;
  width: 20rem;
  height: 7rem;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

}
.inputsenhaantigo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  width: 90%;
  height: 3rem;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  padding: 15px;
}
.img {
  width: 2rem;
  height: 2rem;
}
.sona {
  width: 100%;
  height: 2.9rem;
  border: none;
  outline: none;
  background-color: transparent;
}
</style>