<template>
  <div class="home">
    <div class="container">
      <sign-in-form />
      <sign-up-form />
    </div>
  </div>
</template>

<script>
import SignInForm from '@/components/forms/sign-in-form'
import SignUpForm from '@/components/forms/sign-up-form'

export default {
  name: 'SignIn',
  components: {
    SignInForm,
    SignUpForm
  }
}
</script>
