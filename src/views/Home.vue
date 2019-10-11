<template>
  <div class="home">
    <div class="container">
      Home
      <button @click="signout" class="btn btn-secondary">Sign out</button>
    </div>
  </div>
</template>

<script>
import { db } from '@/firestore/db'

export default {
  name: 'home',
  components: {},
  data() {
    return {
      users: []
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('SIGN_OUT')
    }
  },
  firestore: {
    users: db.collection('users')
  }
}
</script>
