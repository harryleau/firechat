<template>
  <div id="chat-room">
    <!-- <div v-if="room && users.length > 0">
      <div class="" v-for="user in room.users" :key="user.id">{{ getUser(user.id).username }}</div>
    </div> -->
    <div class="messages">
      <div
        class="no-message-text"
        v-if="room && users.length > 0 && (!room.messages || (room.messages && room.messages.length === 0))"
      >
        This is chat room <span class="room-name">#{{ room.name }}</span> of you -
        <span class="name" v-for="user in room.users" :key="user.id">{{ getUser(user.id).username }}, </span> let's
        start your conversation.
      </div>
      <div class="wrapper" v-if="room && room.messages && users.length > 0">
        <div v-for="(message, i) in room.messages" :key="i" class="message">
          <div class="profile-info">
            <img class="avatar" src="@/assets/avatar.png" alt="" />
            <div class="details">
              <div class="top">
                <span class="name">{{ getUser(message.user).username }}</span>
                <span class="time">{{ generateTime(message.createdTime) }}</span>
              </div>
              <p class="text">{{ message.text }}</p>
            </div>
            <span class="ml-auto remove-icon" @click="deleteMessage(message)">x</span>
          </div>
        </div>
      </div>
    </div>
    <input type="text" class="input" v-model="text" @keyup.enter="sendMessage" />
  </div>
</template>

<script>
import { db } from '@/firestore/db'
import { fs_sendMessage, fs_deleteMessage } from '@/firestore/services/chat-room'
import moment from 'moment'
const roomsCollection = db.collection('rooms')
export default {
  name: 'chat-room',
  data() {
    return {
      room: null,
      users: [],
      text: null
    }
  },
  props: {
    roomId: {
      type: String,
      default: null
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  },
  methods: {
    getUser(id) {
      return this.users.find(user => user.id === id)
    },
    generateTime(timeStamp) {
      const diffInMins = Math.round((Date.now() - timeStamp) / (1000 * 60))
      if (diffInMins < 60 * 20) {
        return moment(timeStamp).format('HH:mm')
      } else {
        return moment(timeStamp).format('DD MMM HH:mm')
      }
    },
    sendMessage() {
      const createdTime = Date.now()
      const text = this.text
      const user = this.loggedInUser.uid

      const data = {
        createdTime,
        text,
        user
      }

      const _this = this
      const cb = () => {
        this.text = null
      }

      fs_sendMessage(this.room.id, data).then(() => (this.text = null))
    },
    deleteMessage(message) {
      fs_deleteMessage(this.room.id, message)
    }
  },
  watch: {
    roomId: {
      immediate: true,
      handler(id) {
        this.$bind('room', roomsCollection.doc(id))
      }
    }
  },
  firestore: {
    users: db.collection('users')
  }
}
</script>

<style lang="scss" scoped>
#chat-room {
  height: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 30px 20px;

  .messages {
    flex-grow: 1;
    height: calc(100% - 100px);
    overflow: auto;
    padding-right: 20px;
    padding-top: 30px;
    .no-message-text {
      color: $off-black;
      text-align: center;
      margin-top: 50px;
      .room-name {
        color: $gold;
        font-weight: 600;
      }
      .name {
        font-weight: 600;
        color: #000;
      }
    }
    .message {
      margin: 10px 0;
      .profile-info {
        align-items: flex-start;
        .avatar {
          width: 45px;
        }
        .details {
          color: #000;
          .top {
            display: flex;
            align-items: center;
          }
          .name {
            font-weight: 700;
            font-size: 16px;
          }
          .time {
            font-size: 12px;
            margin-left: 5px;
            color: $grey-dark;
            font-weight: 300;
          }
          .text {
            font-weight: 500;
            color: $off-black;
          }
        }
      }
    }
  }

  input {
    background: transparent;
    border: 1px solid $off-black;
    padding: 10px;
    color: $off-black;
    font-size: 18px;
    font-weight: 700;
    height: 50px !important;
    margin-right: 20px;
    margin-top: 50px;
  }

  .remove-icon {
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
