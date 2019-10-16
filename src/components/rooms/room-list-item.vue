<template>
  <div class="room-list-item" :class="{ active: isActive, highlighted: hasNewMessage }">
    <span class="name" @click="$emit('select-room', room)"># {{ room.name }}</span>
    <span @click="deleteRoom(room)" v-if="allowDelete" class="link">delete</span>
  </div>
</template>
<script>
export default {
  name: 'room-list-item',
  props: {
    room: Object,
    activeRoom: Object
  },
  data() {
    return {
      hasNewMessage: false
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    creator() {
      return this.room.users.find(u => u.type === 'creator')
    },
    allowDelete() {
      return this.loggedInUser.uid === this.creator.id
    },
    isActive() {
      if (!this.activeRoom) return false
      return this.activeRoom.id === this.room.id
    }
  },
  methods: {
    deleteRoom(room) {
      this.$emit('select-room', null)
      this.$store.dispatch('DELETE_ROOM', { room, cb: () => {} })
    }
  },
  watch: {
    'room.messages': {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal && oldVal) {
          if (newVal.length !== oldVal && !this.isActive) {
            this.hasNewMessage = true
          } else {
            this.hasNewMessage = false
          }
        }
      }
    },
    isActive(newVal, oldVal) {
      if (newVal !== oldVal && newVal === true) {
        this.hasNewMessage = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.room-list-item {
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-size: 16px;
    cursor: pointer;
    font-weight: 300;
    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
  .link {
    font-size: 14px;
  }

  &.active {
    .name {
      color: $gold;
      font-weight: 700;
      text-decoration: underline;
    }
  }

  &.highlighted {
    .name {
      color: $green-blue;
      // color: $gold;
      font-weight: 700;
    }
  }
}
</style>
