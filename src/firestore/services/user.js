import { db } from '../db'
import firebase from 'firebase'

export const fs_getAllUsers = cb => {
  db.collection('users').onSnapshot(querySnapshot => cb(querySnapshot))
}

export const fs_getUserById = id => {
  db.collection('users')
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      } else {
        return null
      }
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

export const fs_addFriend = (id, friendId) => {
  return db
    .collection('users')
    .doc(id)
    .update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendId)
    })
}

export const fs_unFriend = (id, friendId) => {
  return db
    .collection('users')
    .doc(id)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(friendId)
    })
}
