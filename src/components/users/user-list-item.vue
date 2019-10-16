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
    <span @click="requestFriend" v-if="!isRequestSent" class="add-icon">+</span>
    <span class="sent" v-else>
      <span class="text">Request sent</span>
    </span>
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
    },
    sentRequests() {
      return this.$store.getters.sentRequests
    },
    isRequestSent() {
      if (this.sentRequests.find(r => r.id === this.user.id)) return true
      return false
    }
  },
  methods: {
    requestFriend() {
      this.$store.dispatch('REQUEST_FRIEND', { user: this.user, cb: () => {} })
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
  .remove-icon {
    color: $slate;
  }
  .sent {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .text {
      font-size: 11px;
      color: $grey-light;
    }
  }
}
</style>
