import auth from '@/firestore/services/auth.js'
import {
  fs_getAllUsers,
  fs_addFriend,
  fs_unFriend,
  fs_requestFriend,
  fs_removeFriendRequest
} from '@/firestore/services/user.js'
import { fs_getRooms, fs_createRoom, fs_deleteRoom } from '@/firestore/services/chat-room.js'

export default {
  state: {
    loggedInUser: null,
    profile: null,
    friends: [],
    friendRequests: [],
    sentRequests: [],
    users: [],
    rooms: [],
    finishLoading: false,
    redirect: '/'
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    profile: state => state.profile,
    friends: state => state.friends,
    friendRequests: state => state.friendRequests,
    sentRequests: state => state.sentRequests,
    users: state => state.users,
    rooms: state => state.rooms,
    finishLoading: state => state.finishLoading,
    redirect: state => state.redirect
  },
  actions: {
    SIGN_IN(undefined, { data, cb }) {
      auth.signIn(data.email, data.password, cb)
    },
    SIGN_UP(undefined, { data, cb }) {
      auth.signUp(data.username, data.email, data.password, cb)
    },
    SIGN_OUT() {
      auth.signOut()
    },
    GET_USERS({ commit }, cb) {
      fs_getAllUsers(querySnapshot => {
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        commit('users', users)
        cb()
      })
    },
    GET_FRIENDS({ commit, state }, cb) {
      let friends = []
      if (state.profile.friends) {
        state.profile.friends.forEach(f => {
          const friend = state.users.find(user => user.id === f)
          if (friend !== null) {
            friends.push(friend)
          }
        })
      }
      commit('friends', friends)
      cb()
    },
    GET_FRIEND_REQUESTS({ commit, state }, cb) {
      let requests = []
      if (state.profile.friendRequests) {
        state.profile.friendRequests.forEach(r => {
          const request = state.users.find(user => user.id === r)
          if (request !== null) {
            requests.push(request)
          }
        })
      }
      commit('friendRequests', requests)
      cb()
    },
    GET_SENT_REQUESTS({ commit, state }, cb) {
      let requests = []
      if (state.profile.sentRequests) {
        state.profile.sentRequests.forEach(r => {
          const request = state.users.find(user => user.id === r)
          if (request !== null) {
            requests.push(request)
          }
        })
      }
      commit('sentRequests', requests)
      cb()
    },
    GET_ROOMS({ commit, state }, cb) {
      fs_getRooms(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const rooms = data.filter(r => r.users.find(u => u.id === state.loggedInUser.uid))
        commit('rooms', rooms)
        cb()
      })
    },
    REQUEST_FRIEND({ state }, { user, cb }) {
      fs_requestFriend(user.id, state.loggedInUser.uid, cb).catch(e => {
        console.log(e)
      })
    },
    REMOVE_REQUEST({ state }, { user, cb }) {
      fs_removeFriendRequest(state.loggedInUser.uid, user.id, cb).catch(e => {
        console.log(e)
      })
    },
    ADD_FRIEND({ state }, { user, cb }) {
      fs_addFriend(state.loggedInUser.uid, user.id, cb).catch(e => {
        console.log(e)
      })
    },
    UNFRIEND({ state }, { friend, cb }) {
      fs_unFriend(state.loggedInUser.uid, friend.id, cb).catch(e => {
        console.log(e)
      })
    },
    CREATE_ROOM(undefined, { name, users, cb }) {
      fs_createRoom(name, users)
        .then(doc => {
          console.log(doc)
          const room = { id: doc.id, name, users }
          cb(room)
        })
        .catch(e => console.log(e))
    },
    DELETE_ROOM({ state }, { room, cb }) {
      fs_deleteRoom(state.loggedInUser.uid, room)
        .then(() => {
          cb()
        })
        .catch(e => console.log(e))
    }
  },
  mutations: {
    loggedInUser: function(state, value) {
      state.loggedInUser = value
    },
    finishLoading: function(state, value) {
      state.finishLoading = value
    },
    profile: (state, value) => {
      state.profile = value
    },
    friends: (state, value) => {
      state.friends = value
    },
    friendRequests: (state, value) => {
      state.friendRequests = value
    },
    sentRequests: (state, value) => {
      state.sentRequests = value
    },
    users: (state, value) => {
      state.users = value
    },
    rooms: (state, value) => {
      state.rooms = value
    },
    redirect: (state, value) => {
      state.redirect = value
    }
  }
}
