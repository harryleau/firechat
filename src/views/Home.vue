<template>
  <div id="home">
    <div class="container">
      <div class="wrapper">
        <div class="sidebar">
          <div class="profile">
            <div class="profile-info">
              <!-- <img class="avatar" src="@/assets/avatar.png" alt="" /> -->
              <img class="avatar" src="https://firechat-harryle.appspot.com/images/avatar.jpg" alt="" />
              <div class="details">
                <span class="name">{{ profile.username }}</span>
                <span class="email">{{ profile.email }}</span>
              </div>
            </div>
            <button @click="signout" class="btn btn-red">Sign out</button>
            <input type="file" multiple enctype="multipart/form-data" @change="selectImage" />
            <button @click="upload" class="btn btn-info">Upload</button>
          </div>
          <friend-list id="friend-list" :friends="friends" />
          <room-list
            @create-room="activeRoom = $event"
            :activeRoom="activeRoom"
            id="room-list"
            @select-room="activeRoom = $event"
            :rooms="rooms"
          />
          <user-list id="user-list" :users="filteredUsers" />
        </div>
        <div class="main">
          <chat-room v-if="activeRoom" :roomId="activeRoom.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendList from '@/components/friends/friend-list'
import UserList from '@/components/users/user-list'
import RoomList from '@/components/rooms/room-list'
import CreateRoom from '@/components/rooms/create-room'
import ChatRoom from '@/components/chat-room/chat-room'
import firebase, { storage } from 'firebase'
export default {
  name: 'home',
  components: { FriendList, UserList, RoomList, CreateRoom, ChatRoom },
  data() {
    return {
      activeRoom: null,
      file: null
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    profile() {
      return this.$store.getters.profile
    },
    users: {
      get() {
        return this.$store.getters.users
      },
      set(value) {
        this.$store.commit('users', value)
      }
    },
    friends: {
      get() {
        return this.$store.getters.friends
      },
      set(value) {
        this.$store.commit('friends', value)
      }
    },
    rooms() {
      return this.$store.getters.rooms
    },
    filteredRooms() {
      return this.rooms.filter(room => room.users.find(user => user.id === this.loggedInUser.uid))
    },
    filteredUsers() {
      return this.users.filter(user => !this.friends.find(f => f.id === user.id) && user.id !== this.loggedInUser.uid)
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('SIGN_OUT')
    },
    addFriend(friend) {
      this.$store.dispatch('ADD_FRIEND', friend)
    },
    selectImage(e) {
      this.file = e.target.files[0]
    },
    upload() {
      const storageRef = firebase.storage().ref()

      const imageRef = storageRef.child('images/avatar.jpg')

      imageRef.put(this.file).then(snapshot => {
        console.log(snapshot)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  .wrapper {
    box-shadow: $shadow;
    display: flex;
    .sidebar {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: $off-black;
      width: 250px;
      padding: 40px 10px;
      .profile {
        .profile-info {
          .avatar {
            width: 60px;
          }
          .details {
            .name {
              font-size: 24px;
              color: $gold;
              font-weight: 600;
            }
            .email {
              font-size: 16px;
            }
          }
        }
        button {
          margin-top: 10px;
        }
      }
      #friend-list {
        margin: 30px 0;
      }
      #room-list {
        margin-bottom: 30px;
      }
    }

    .main {
      width: calc(100% - 200px);
      flex-grow: 1;
      background: radial-gradient($grey-light, $slate);
      // background: $grey-light;
    }
  }
}
</style>
