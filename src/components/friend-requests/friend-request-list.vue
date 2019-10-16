<template>
  <div id="friend-request-list">
    <h3 class="heading-3">Friend Requests</h3>
    <friend-request-list-item v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>
<script>
import FriendRequestListItem from './friend-request-list-item'
export default {
  name: 'friend-request-list',
  components: {
    FriendRequestListItem
  },
  props: {
    users: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
#friend-request-list {
}
</style>
