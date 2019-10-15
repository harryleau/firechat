<template>
  <div id="app">
    <router-view v-if="finishLoading" />
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    finishLoading() {
      return this.$store.getters.finishLoading
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $off-white;
  background: radial-gradient($slate-dark, #000);
  min-height: 100vh;
}
</style>
