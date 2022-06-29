<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card my-5">
                    <form class="card-body cardbody-color p-lg-4">
                        <div>
                            <h2>Novo Usuário</h2>
                        </div>

                        <div class="mb-3">
                            <input type="text" class="form-control" id="user" v-model="nomeDoUsuario"
                                placeholder="Nome do usuário" />
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control" id="email" v-model="emailDoUsuario"
                                placeholder="Email" />
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" id="password" v-model="senhaDoUsuario"
                                placeholder="password" />
                        </div>
                        <b-alert :show="mostraErro" variant="warning">
                            {{ mensagemDeErro }}
                        </b-alert>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary px-5 mb-3 w-100" @click="cadastrar()">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../../services/user-service'
import router from '../../router'

export default {
    name: 'Cadastro',
    data() {
        return {
            mostraErro: false,
            mensagemDeErro: '',
            nomeDoUsuario: '',
            emailDoUsuario: '',
            senhaDoUsuario: ''
        }
    },
    mounted: function () {
    },
    methods: {
        cadastrar() {
            if (this.nomeDoUsuario === '') {
                this.mensagemDeErro = 'Nome inválido'
                this.mostraErro = true
                setTimeout(() => {
                    this.mostraErro = false
                }, 2000)
                return
            }

            if (this.emailDoUsuario === '') {
                this.mensagemDeErro = 'Email inválido'
                this.mostraErro = true
                setTimeout(() => {
                    this.mostraErro = false
                }, 2000)
                return
            }

            if (this.senhaDoUsuario === '') {
                this.mensagemDeErro = 'Senha inválida'
                this.mostraErro = true
                setTimeout(() => {
                    this.mostraErro = false
                }, 2000)
                return
            }

      UserService.cadastroUsuario(this.nomeDoUsuario, this.emailDoUsuario, this.senhaDoUsuario)
        .then(response => {
          if (response.status === 200) {

            router.push({ name: 'Login' })
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
.btn-color {
    background-color: #0e1c36;
    color: #fff;
}

.profile-image-pic {
    height: 200px;
    width: 200px;
    object-fit: cover;
}

.cardbody-color {
    background-color: #30445c;
}
</style>