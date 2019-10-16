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

export const fs_requestFriend = (friendId, userId, cb) => {
  return db
    .collection('users')
    .doc(friendId)
    .update({
      friendRequests: firebase.firestore.FieldValue.arrayUnion(userId)
    })
    .then(() => {
      return db
        .collection('users')
        .doc(userId)
        .update({
          sentRequests: firebase.firestore.FieldValue.arrayUnion(friendId)
        })
        .then(() => cb())
    })
}

export const fs_removeFriendRequest = (id, friendId, cb) => {
  return db
    .collection('users')
    .doc(id)
    .update({
      friendRequests: firebase.firestore.FieldValue.arrayRemove(friendId)
    })
    .then(() => {
      return db
        .collection('users')
        .doc(friendId)
        .update({
          sentRequests: firebase.firestore.FieldValue.arrayRemove(id)
        })
        .then(() => cb())
    })
}

export const fs_addFriend = (id, friendId, cb) => {
  return db
    .collection('users')
    .doc(id)
    .update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendId)
    })
    .then(() => {
      return db
        .collection('users')
        .doc(friendId)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(id)
        })
        .then(() => {
          fs_removeFriendRequest(id, friendId, cb)
        })
    })
}

export const fs_unFriend = (id, friendId, cb) => {
  return db
    .collection('users')
    .doc(id)
    .update({
      friends: firebase.firestore.FieldValue.arrayRemove(friendId)
    })
    .then(() => {
      return db
        .collection('users')
        .doc(friendId)
        .update({
          friends: firebase.firestore.FieldValue.arrayRemove(id)
        })
        .then(() => cb())
    })
}
