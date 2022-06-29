import Vue from 'vue'
import Router from 'vue-router'

import AuthGuard from '../middleware/auth-guard'

const Login = () => import('@/pages/login/LoginPage')
const Home = () => import('@/pages/home/HomePage')
const Perfil = () => import('@/pages/perfil/PerfilPage')
const Cadastro = () => import('@/pages/cadastro/CadastroPage')
const TrocarSenha = () => import('@/pages/trocarSenha/TrocarSenhaPage')

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/login',
      name: 'Pages',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'cadastro',
          name: 'Cadastro',
          component: Cadastro
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter (to, from, next) {
        let auth = AuthGuard.estaLogado()
        if (!auth) next({ name: 'Login' })
        else next()
      }
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil,
      beforeEnter (to, from, next) {
        let auth = AuthGuard.estaLogado()
        if (!auth) next({ name: 'Login' })
        else next()
      }
    },
    {
      path: '/trocarsenha',
      name: 'TrocarSenha',
      component: TrocarSenha,
      beforeEnter (to, from, next) {
        let auth = AuthGuard.estaLogado()
        if (!auth) next({ name: 'Login' })
        else next()
      }
    }
  ]
}
