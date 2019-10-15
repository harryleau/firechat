<template>
  <div id="user-list">
    <h3 class="heading-3">People you may know</h3>
    <user-list-item v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>
<script>
import UserListItem from './user-list-item'
export default {
  name: 'user-list',
  components: {
    UserListItem
  },
  props: {
    users: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="scss">
#user-list {
}
</style>
