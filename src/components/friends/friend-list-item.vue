<template>
  <div class="friend-list-item">
    <div class="profile-info">
      <img class="avatar" v-if="!avatar" src="@/assets/avatar.png" alt="" />
      <img class="avatar" v-else :src="avatar" alt="" />
      <div class="details">
        <span class="name">{{ friend.username }}</span>
      </div>
    </div>
    <span v-if="!isLoading" @click="unFriend" class="link">unfriend</span>
    <span v-else><img class="loading-icon" src="@/assets/loading.gif" alt=""/></span>
  </div>
</template>

<script>
export default {
  name: 'friend-list-item',
  props: {
    friend: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    avatar() {
      return this.friend.avatar
    }
  },
  methods: {
    unFriend() {
      const _this = this
      const cb = () => {
        _this.isLoading = false
      }
      this.isLoading = true
      this.$store.dispatch('UNFRIEND', { friend: this.friend, cb })
    }
  }
}
</script>

<style scoped lang="scss">
.friend-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .link {
    font-size: 14px;
  }

  .loading-icon {
    width: 16px;
  }
}
</style>
