<template>
  <b-modal id="modal-create-room" title="Create new room" hide-footer>
    <div class="form no-border" id="create-room-form">
      <div class="input-group">
        <label for="name">Name</label>
        <input type="text" v-model="name" @input="onNameChange" class="input mt-1" id="name" />
      </div>
      <div class="input-group">
        <label for="participants">Participants:</label>
        <div class="participant-list">
          <span class="participant-list-item" v-for="p in participants" :key="p.id">
            <span class="name">{{ p.username }}</span>
            <span @click="remove(p)" class="add-icon remove-icon">&#8722;</span>
          </span>
        </div>
      </div>
      <div class="input-group">
        <label for="search">Your friends</label>
        <div class="friend-list">
          <span class="friend-list-item" v-for="friend in filteredFriends" :key="friend.id">
            <span class="name">{{ friend.username }}</span>
            <span @click="invite(friend)" class="add-icon">+</span>
          </span>
        </div>
      </div>
      <div class="button-actions">
        <button class="btn btn-gold" type="button" @click="onCreate">Create</button>
      </div>
      <div class="error" v-if="error">{{ error }}</div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'create-room',
  data() {
    return {
      name: null,
      participants: [],
      error: null
    }
  },
  computed: {
    friends() {
      return this.$store.getters.friends
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    filteredFriends() {
      return this.friends.filter(f => !this.participants.includes(f))
    },
    rooms() {
      return this.$store.getters.rooms
    }
  },
  methods: {
    invite(friend) {
      this.participants.push(friend)
    },
    remove(friend) {
      this.participants = this.participants.filter(p => p.id !== friend.id)
    },
    onNameChange(e) {
      if (this.rooms.find(r => r.name.toLowerCase() === e.target.value.toLowerCase())) {
        this.error = 'This room already exists'
      } else {
        this.error = null
      }
    },
    onCreate() {
      if (this.error) {
        return
      }
      if (!this.name) {
        this.error = 'Please fill in all fields!'
        return
      }
      const users = this.participants.map(p => ({ type: 'guests', id: p.id }))
      users.push({ type: 'creator', id: this.loggedInUser.uid })

      const _this = this
      const cb = room => {
        _this.$emit('create-room', room)
        _this.$bvModal.hide('modal-create-room')
        _this.name = null
        _this.participants = []
      }
      this.$store.dispatch('CREATE_ROOM', { name: this.name, users, cb })
    }
  }
}
</script>

<style lang="scss">
#modal-create-room {
  .form {
    padding: 0;
    max-width: 100%;

    .participant-list {
      display: flex;
      flex-wrap: wrap;
      &-item {
        display: flex;
        align-items: center;
        margin-right: 15px;
        .name {
          margin-right: 5px;
          color: $slate;
          font-weight: 400;
        }
        .remove-icon {
        }
      }
    }

    .friend-list {
      display: flex;
      flex-wrap: wrap;

      &-item {
        display: flex;
        align-items: center;
        margin-right: 15px;

        .name {
          margin-right: 5px;
          font-size: 300;
          color: $slate;
        }
      }
    }
  }
}
</style>
