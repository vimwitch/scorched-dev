import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import App from './App'
import Home from './Home'
import WalletStore from './stores/wallet'
import ScorchedStore from './stores/scorched'

export function createApp(cookie) {
  Vue.use(VueRouter)
  Vue.use(Vuex)
  Vue.use(Meta)
  const store = new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {},
    modules: {
      wallet: WalletStore,
      scorched: ScorchedStore,
    },
  })
  const router = new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
    ]
  })
  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })
  return { app, router, store }
}

const { app } = createApp()
app.$mount('#app')
