<template>
  <div class="tela">
    <BarraNavegacao class="barra"></BarraNavegacao>
    <div class="contain">
      <div class="espacador" @click="novaMensagem()" v-if="mostraInput == false">
        <img class="imgIconsmsg" src="../../assets/2190552.png" alt="icone msg">
      </div>
      <div class="containerA">
        <div class="informacao">
          <div class="info-user">
            <p>user logado</p>
            <p>21 anos</p>
          </div>
          <div class="divicons">
            <div class="itens">
              <img class="iconsmsg" @click="novaMensagem()" v-if="mostraInput == false"
                src="https://cdn-icons-png.flaticon.com/128/2190/2190552.png" alt="">
            </div>
            <div class="itens">
              <img class="iconsmsg" src="../../assets/476863.png" alt="">
            </div>
            <div class="itens">
              <img class="iconsmsg" src="../../assets/1665680.png" alt="">

            </div>
          </div>
        </div>
        <div class="informacaoB">
          <img class="iconsmsg" src="../../assets/job-search (1).png" alt="">
          <input class="inputSearch" type="search" placeholder="pocura seu amigo">
        </div>
        <div class="listUsers">
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
          <ListUsers></ListUsers>
        </div>
      </div>
      <div class="containerB">
        <div class="mensagens">
          <div class="mensagen" :class="userData.usuario_id == item.usuario_id ? 'mensagenLogado' : 'mensagemNaoLogado'"
            v-for="item in mensagens" :key="item.mensagem_id">
            <div class="mensagenItens">
              <p class="textmsg" :class="userData.usuario_id == item.usuario_id ? 'userLogado' : 'userNaoLogado'">{{
                  item.mensagem
              }}</p>
              <div class="pes">
                <p class="name">{{ item.usuario_nome }}</p>
                <p class="data">{{ item.mensagem_data }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="containerBA">
          <div class="containerC" v-if="mostraInput == true">
            <textarea v-model="textoDigitado" type="textarea" class="textarea" placeholder="Digite sua mensagem...">
            </textarea>
            <div class="icons" @click="cancelar()">
              <img class="icon" src="../../assets/delete-message.png" alt="cancelar mensagem">
            </div>
            <div class="icons" @click="enviaMensagem()">
              <img class="icon" src="../../assets/send-message.png" alt="uma imagem send mesage">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarraNavegacao from '../../components/BarraNavegacao.vue'
import MessageService from '../../services/message-service'
import LocalStorageService from '../../utils/local-storage-service'
import ListUsers from '../../components/ListUsers.vue'

export default {
  name: 'Home',
  components: {
    BarraNavegacao,
    ListUsers
  },
  data() {
    return {
      textoDigitado: '',
      mostraInput: false,
      userData: {},
      mensagens: []
    }
  },
  mounted() {
    this.userData = LocalStorageService.getUserData()
    MessageService.retornaTodasMensagens().then(response => {
      console.log(response)
      this.mensagens = response.data
    })
  },
  methods: {
    novaMensagem() {
      this.textoDigitado = ''
      this.mostraInput = true
    },
    cancelar() {
      this.mostraInput = false
    },
    enviaMensagem() {
      if (this.textoDigitado.length === 0) {
        alert('Cabeção: Digite sua mensagem.')
        return
      }
      MessageService.novaMensagem(this.userData.usuario_id, this.textoDigitado).then(response => {
        var data = { soundurl: 'http://soundbible.com/mp3/sms-alert-5-daniel_simon.mp3' }
        var audioFile = new Audio(data.soundurl)
        audioFile.play()
        MessageService.retornaTodasMensagens().then(response => {
          this.mensagens = response.data
        })
      })

      this.mostraInput = false
    }
  }
}
</script>

<style scoped>
:root {
  --box-shadow: ;
}

.barra {
  position: fixed;
  width: 100%;
  height: 10%;
}

.tela {
  width: 100%;
  height: 100vh;
}

.contain {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}

.containerA {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
  border-right: 1px solid rgb(195, 192, 192);
}


.informacao {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.9rem;
  width: 100%;
  height: 4rem;
  background-color: rgba(224, 223, 223, 0.886);
  border-bottom: 1px solid rgb(173, 168, 168);
}

.info-user {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 15px;
  text-align: left;
  width: 40%;
  height: 80%;
}

.info-user p:nth-child(1) {
  margin-top: 1rem;
  color: rgb(185, 59, 80);
  font-style: oblique;
  width: 100%;
}

.info-user p:nth-child(2) {
  margin-top: -12px;
  color: black;
  font-size: 15px;
  width: 100%;
}

.divicons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 60%;
}

.itens {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 16%;
  height: 100%;
}

.iconsmsg {
  width: 2.3rem;
  height: 2.3rem;
}

.informacaoB {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  margin-top: 5px;
  border-radius: 2.4rem;
}

.informacaoB .iconsmsg {
  width: 2rem;
  height: 1.8rem;
}

.inputSearch {
  width: 80%;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
}

.listUsers {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
  border: 1px solid rgb();
  width: 95%;
  height: 80%;
  overflow: auto;
}

.listUsers::-webkit-scrollbar {
  width: 0px;
}

.containerB {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100%;
}

.mensagens {
  padding: 6rem;
  width: 100%;
  background-color: rgba(224, 223, 223, 0.886);
  overflow: auto;
}

.name,
.data {
  font-size: 11px;
  text-transform: uppercase;
}

.mensagen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-bottom: 2rem;
  margin-left: -3rem;
  height: auto;
  border-radius: 3rem;
}

.mensagenLogado {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: -5rem !important;
}

.mensagemNaoLogado {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.userLogado {
  color: crimson;
  padding: 0;
}

.margin-direta {
  background-color: red;
}

.mensagenItens {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;

}

.textmsg {
  background-color: #fff;
  width: 100%;
  height: auto;
  border-top-right-radius: 3rem;
  padding: 15px;
}

.pes {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(224, 223, 223, 0.886);
  border-top-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
  border-bottom-left-radius: 3rem;
  gap: 1rem;
  text-align: center;
  margin-top: -1rem;
  padding: 15px;
  width: 100%;
  height: auto;


}

.mensagens::-webkit-scrollbar {
  width: 5px;
}


.espacador {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15rem;
  right: 3rem;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  border: none;
  font-size: 2.3rem;
  text-transform: uppercase;
  color: rgb(36, 4, 9);
  background-color: transparent;
}

.imgIconsmsg {
  cursor: pointer;
  width: 3rem;
  height: 3rem;
}

.containerBA {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  width: 60%;
  height: 10%;
  background-color: rgba(224, 223, 223, 0.886);
  ;
}

.containerC {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  width: 100%;
  height: 100%;
}

.textarea {
  width: 60%;
  height: 90%;
  border: none;
  background-color: transparent;
  outline: none;
  border: 1px solid black;
  color: rgb(52, 47, 47);
}


.textarea::-webkit-scrollbar {
  width: 1px;
}

.icons {
  width: 2rem;
  height: 2rem;
}

.icon {
  width: 2rem;
  height: 2rem;
}
</style>
