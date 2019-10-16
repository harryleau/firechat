<template>
  <div id="app">
    <div class="loading" v-if="!finishLoading">
      <img class="loading-icon" src="@/assets/loading.gif" alt="" />
    </div>
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

  .loading {
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
    }
  }
}
</style>
