import { services } from '@/firestore/db'

export default {
  state: {
    loggedInUser: null,
    newUser: {}
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    newUser: state => state.newUser
  },
  actions: {
    SIGN_IN(undefined, { data, cb }) {
      services.signIn(data.email, data.password, cb)
    },
    SIGN_UP(undefined, { data, cb }) {
      services.signUp(data.email, data.password, cb)
    },
    SIGN_OUT() {
      services.signOut()
    }
  },
  mutations: {
    loggedInUser: function(state, value) {
      state.loggedInUser = value
    },
    newUser: (state, value) => {
      state.newUser = value
    }
  }
}
