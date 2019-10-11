import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCBEA1NXLkIjO5SWRgVa5NljKylb9eBteY',
  authDomain: 'firechat-harryle.firebaseapp.com',
  databaseURL: 'https://firechat-harryle.firebaseio.com',
  projectId: 'firechat-harryle',
  storageBucket: 'firechat-harryle.appspot.com',
  messagingSenderId: '48607968897',
  appId: '1:48607968897:web:ba48789522d7da7b4f9780'
}
export const db = firebase.initializeApp(firebaseConfig).firestore()

export const getAuthUser = (successfulCb, failedCb) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      successfulCb(user)
    } else {
      failedCb()
    }
  })
}

export const services = {
  signIn: (email, password, cb) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        cb('Invalid Credentials!')
      })
  },
  signUp: (email, password, cb) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(() => {
        cb('Account already exists')
      })
  },
  signOut: () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
        console.log(error)
      })
  }
}
