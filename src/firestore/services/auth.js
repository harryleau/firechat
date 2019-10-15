import firebase from 'firebase'
import { db } from '../db'

export default {
  getAuthUser: (successfulCb, failedCb) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userId = firebase.auth().currentUser.uid
        db.collection('users')
          .doc(userId)
          .onSnapshot(doc => {
            if (doc.exists) {
              successfulCb(user, doc.data())
            }
          })
      } else {
        failedCb()
      }
    })
  },
  signIn: (email, password, cb) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => {
        cb('Invalid Credentials!')
      })
  },
  signUp: (username, email, password, cb) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        db.collection('users')
          .doc(res.user.uid)
          .set({
            username,
            email
          })
          .then()
          .catch(e => console.log(e))
      })
      .catch(e => {
        console.log(e)
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
