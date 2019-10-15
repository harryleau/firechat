import { db } from '../db'
import firebase from 'firebase'
const uuidv4 = require('uuid/v4')

export const fs_getRooms = cb => {
  db.collection('rooms').onSnapshot(querySnapshot => cb(querySnapshot))
}

export const fs_createRoom = (name, users) => {
  return db.collection('rooms').add({
    name,
    users
  })
}

export const fs_deleteRoom = (userId, room) => {
  const creator = room.users.find(u => u.type === 'creator')
  if (creator && creator.id === userId) {
    return db
      .collection('rooms')
      .doc(room.id)
      .delete()
  } else {
    return Promise.reject()
  }
}

export const fs_sendMessage = (roomId, data) => {
  const id = uuidv4()
  return db
    .collection('rooms')
    .doc(roomId)
    .update({
      messages: firebase.firestore.FieldValue.arrayUnion({ id, ...data })
    })
}

export const fs_deleteMessage = (roomId, message) => {
  return db
    .collection('rooms')
    .doc(roomId)
    .update({
      messages: firebase.firestore.FieldValue.arrayRemove(message)
    })
}
