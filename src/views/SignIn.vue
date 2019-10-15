<template>
  <div id="sign-in">
    <div class="container">
      <div class="wrapper">
        <div class="header">
          <h1>FIRECHAT</h1>
        </div>
        <sign-in-form id="sign-in-form" v-if="activeForm === 1" @open-sign-up="activeForm = 2" />
        <sign-up-form id="sign-in-form" v-if="activeForm === 2" @open-sign-in="activeForm = 1" />
      </div>
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
  },
  data() {
    return {
      activeForm: 1
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in {
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    h1 {
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 50px;
      margin-top: 100px;
      color: $red;
    }
  }
}
</style>
