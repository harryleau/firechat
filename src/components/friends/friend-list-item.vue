<template>
  <div class="friend-list-item">
    <div class="profile-info">
      <img class="avatar" src="@/assets/avatar.png" alt="" />
      <div class="details">
        <span class="name">{{ friend.username }}</span>
      </div>
    </div>
    <span @click="unFriend" class="link">unfriend</span>
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
    return {}
  },
  computed: {},
  methods: {
    unFriend() {
      this.$store.dispatch('UNFRIEND', this.friend)
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
}
</style>
