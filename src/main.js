import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'
import router from './router'
import store from './store/index.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { getAuthUser } from './firestore/db'

Vue.config.productionTip = false

// plugins
Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

const successfulCb = user => {
  store.commit('loggedInUser', user)
  router.push('/')
}

const failedCb = () => {
  router.push('/sign-in')
}

getAuthUser(successfulCb, failedCb)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
