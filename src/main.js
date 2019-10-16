import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import router from './router'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import auth from './firestore/services/auth.js'

Vue.config.productionTip = false

// plugins
Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

const successfulCb = (user, profile) => {
  store.commit('loggedInUser', user)
  store.commit('profile', profile)
  store.dispatch('GET_USERS', () => {
    store.dispatch('GET_FRIENDS', () => {
      store.dispatch('GET_ROOMS', () => {
        store.dispatch('GET_FRIEND_REQUESTS', () => {
          store.dispatch('GET_SENT_REQUESTS', () => {
            store.commit('finishLoading', true)
            const redirect = window.location.pathname === '/sign-in' ? '/' : window.location.pathname
            router.push(redirect, () => {})
          })
        })
      })
    })
  })
}

const failedCb = () => {
  store.commit('finishLoading', true)
  router.push('/sign-in', () => {})
}

auth.getAuthUser(successfulCb, failedCb)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
