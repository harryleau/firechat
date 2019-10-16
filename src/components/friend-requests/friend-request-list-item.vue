<template>
  <div class="friend-request-list-item">
    <div class="profile-info">
      <img class="avatar" v-if="!avatar" src="@/assets/avatar.png" alt="" />
      <img class="avatar" v-else :src="avatar" alt="" />
      <div class="details">
        <span class="name">{{ user.username }}</span>
      </div>
    </div>
    <div class="actions">
      <span v-if="!isLoading" @click="addFriend" class="add-icon">+</span>
      <span v-if="!isLoading" @click="removeRequest" class="add-icon remove-icon">-</span>
      <span v-if="isLoading"><img class="loading-icon" src="@/assets/loading.gif" alt=""/></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'friend-request-list-item',
  props: {
    user: {
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
      return this.user.avatar
    }
  },
  methods: {
    removeRequest() {
      this.$store.dispatch('REMOVE_REQUEST', { user: this.user, cb: () => {} })
    },
    addFriend() {
      const _this = this
      const cb = () => {
        _this.isLoading = false
      }
      this.isLoading = true
      this.$store.dispatch('ADD_FRIEND', { user: this.user, cb })
    }
  }
}
</script>

<style scoped lang="scss">
.friend-request-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .actions {
    display: flex;
    .add-icon.remove-icon {
      color: $grey-light;
      margin-left: 5px !important;
    }
    .loading-icon {
      width: 20px;
    }
  }
}
</style>
