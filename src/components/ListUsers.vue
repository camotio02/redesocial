<template>
    <div class="listas">
        <div class="divImage">
            <img class="imageUser"
                src="../assets/278855603_714458996392819_5890061244741874371_n (1).jpg"
                alt="">
        </div>
        <div class="infoUsers">
            <div>Temotio luis</div>
            <div>Leão</div>
        </div>
    </div>
</template>

<script>
import LocalStorageService from '../utils/local-storage-service'
import UserService from '../services/user-service'
import router from '../router'
export default {
    name: 'ListUsers',
    data() {

    },
    mounted() {

    },
    methods: {
        trocarSenha() {
            router.push({ name: 'TrocarSenha' })
        }
    }
}
</script>
<style scoped>
.listas {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  gap: 1rem;
  width: 95%;
  height: 3.3rem;
  margin-inline: auto;
 box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
  border: 1px solid rgb(170, 163, 163);
}
.divImage,
.imageUser {
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  border: 1px solid rgb(170, 163, 163);
}


</style>
