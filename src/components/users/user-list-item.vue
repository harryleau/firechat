<template>
  <div class="user-list-item">
    <div class="profile-info">
      <img class="avatar" v-if="!avatar" src="@/assets/avatar.png" alt="" />
      <img class="avatar" v-else :src="avatar" alt="" />
      <div class="details">
        <span class="name">{{ user.username }}</span>
        <span class="email">{{ user.email }}</span>
      </div>
    </div>
    <span @click="addFriend" class="add-icon">+</span>
  </div>
</template>

<script>
export default {
  name: 'user-list-item',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    avatar() {
      return this.user.avatar
    }
  },
  methods: {
    addFriend() {
      this.$store.dispatch('ADD_FRIEND', this.user)
    }
  }
}
</script>

<style scoped lang="scss">
.user-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .name {
    font-weight: 600;
    color: $gold;
  }

  .email {
    font-weight: 300;
  }
}
</style>
