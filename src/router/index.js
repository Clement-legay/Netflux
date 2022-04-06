import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from "../views/Register";
import Accueil from "../views/Accueil";
import expand from "@/components/expand";
import test from "@/components/test";

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Connexion',
    component: Register
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
