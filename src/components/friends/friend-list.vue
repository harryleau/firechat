<template>
  <div id="friend-list">
    <h3 class="heading-3">Friends</h3>
    <friend-list-item v-for="friend in friends" :key="friend.id" :friend="friend" />
  </div>
</template>
<script>
import FriendListItem from './friend-list-item'
export default {
  name: 'friend-list',
  components: {
    FriendListItem
  },
  props: {
    friends: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="scss">
#friend-list {
}
</style>
