<template>
  <div class="form" id="sign-in-form">
    <h3 class="form-heading">Sign in to your account</h3>
    <div class="input-group">
      <label for="email">email</label>
      <input type="text" v-model="email" class="input" id="email" />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input type="password" v-model="password" class="input" id="password" />
    </div>
    <div class="button-actions">
      <button class="btn btn-primary" type="button" @click="onSignIn">Sign in</button>
    </div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import validator from 'email-validator'
export default {
  name: 'sign-in-form',
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
      error: null
    }
  },
  computed: {},
  methods: {
    onSignIn() {
      // check all fields filled
      if (!this.email || !this.password) {
        this.error = 'Please fill in all fields!'
        return
      }

      // check email
      if (!validator.validate(this.email)) {
        this.error = 'Email is not valid!'
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
        email: this.email,
        password: this.password
      }
      // dispatch action
      this.$store.dispatch('SIGN_IN', { data, cb })
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in-form {
}
</style>
