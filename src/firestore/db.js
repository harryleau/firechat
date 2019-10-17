// import firebase from 'firebase'
import * as firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCBEA1NXLkIjO5SWRgVa5NljKylb9eBteY',
  authDomain: 'firechat-harryle.firebaseapp.com',
  databaseURL: 'https://firechat-harryle.firebaseio.com',
  projectId: 'firechat-harryle',
  storageBucket: 'firechat-harryle.appspot.com',
  messagingSenderId: '48607968897',
  appId: '1:48607968897:web:ba48789522d7da7b4f9780',
  measurementId: 'G-SW2YT2FBFD'
}
export const db = firebase.initializeApp(firebaseConfig).firestore()
firebase.analytics()
