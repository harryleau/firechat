<template>
  <div class="form" id="sign-up-form">
    <h3 class="form-heading">Create a new account</h3>
    <div class="input-group">
      <label for="username">Username</label>
      <input type="text" v-model="username" class="input" id="username" />
    </div>
    <div class="input-group">
      <label for="email">Email</label>
      <input type="email" v-model="email" class="input" id="email" />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input type="password" v-model="password" class="input" id="password" />
    </div>
    <div class="input-group">
      <label for="passwordConfirmed">Confirm Password</label>
      <input type="password" v-model="passwordConfirmed" class="input" id="passwordConfirmed" />
    </div>
    <div class="button-actions">
      <button class="btn btn-primary" type="button" @click="onSubmit">Submit</button>
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import db from '@/firestore/db'
import validator from 'email-validator'
export default {
  name: 'sign-up-form',
  data() {
    return {
      username: null,
      email: null,
      password: null,
      passwordConfirmed: null,
      error: null,
      isLoading: false
    }
  },
  computed: {},
  methods: {
    onSubmit() {
      // check all fields filled
      if (!this.username || !this.email || !this.password || !this.passwordConfirmed) {
        this.error = 'Please fill in all fields!'
        return
      }

      // check email
      if (!validator.validate(this.email)) {
        this.error = 'Email is not valid!'
        return
      }

      // check password
      if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters!'
        return
      }

      if (this.password !== this.passwordConfirmed) {
        this.error = 'Passwords do not match!'
        return
      }

      this.isLoading = true

      // after validation
      const _this = this
      // callback after function
      const cb = errorMessage => {
        _this.isLoading = false
        _this.error = errorMessage
      }
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      // dispatch action
      this.$store.dispatch('SIGN_UP', { data, cb })
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-up-form {
}
</style>
