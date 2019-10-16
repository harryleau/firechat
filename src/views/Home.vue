<template>
  <div id="home">
    <div class="container">
      <div class="wrapper">
        <div class="sidebar">
          <div class="profile">
            <div class="profile-info">
              <img v-b-modal.modal-change-avatar class="avatar" v-if="avatar" :src="avatar" alt="" />
              <img v-b-modal.modal-change-avatar class="avatar" v-else src="@/assets/avatar.png" alt="" />
              <div class="details">
                <span class="name">{{ profile.username }}</span>
                <span class="email">{{ profile.email }}</span>
              </div>
            </div>
          </div>
          <friend-request-list id="friend-request-list" class="mt-3" :users="friendRequests" />
          <friend-list id="friend-list" :friends="friends" />
          <room-list
            @create-room="activeRoom = $event"
            :activeRoom="activeRoom"
            id="room-list"
            @select-room="activeRoom = $event"
            :rooms="rooms"
          />
          <user-list id="user-list" :users="filteredUsers" />
          <div class="footer">
            <button @click="signout" class="btn btn-red">Sign out</button>
          </div>
        </div>
        <div class="main">
          <chat-room v-if="activeRoom" :roomId="activeRoom.id" />
        </div>
      </div>
    </div>
    <b-modal id="modal-change-avatar" title="Change your avatar" hide-footer>
      <img class="avatar" v-if="previewAvatar" :src="previewAvatar" alt="" />
      <img class="avatar" v-else src="@/assets/avatar.png" alt="" />
      <input
        id="file-select"
        type="file"
        multiple
        enctype="multipart/form-data"
        title="Change avatar"
        @change="selectImage"
      />
      <img class="loading-icon" v-if="isLoading" src="@/assets/loading.gif" alt="" />
      <button @click="upload" v-if="!isLoading" class="btn btn-gold">Upload</button>
    </b-modal>
  </div>
</template>

<script>
import FriendList from '@/components/friends/friend-list'
import FriendRequestList from '@/components/friend-requests/friend-request-list'
import UserList from '@/components/users/user-list'
import RoomList from '@/components/rooms/room-list'
import ChatRoom from '@/components/chat-room/chat-room'
import firebase from 'firebase'
import { db } from '@/firestore/db'
export default {
  name: 'home',
  components: { FriendList, UserList, RoomList, ChatRoom, FriendRequestList },
  data() {
    return {
      activeRoom: null,
      file: null,
      isLoading: false
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
    friendRequests() {
      return this.$store.getters.friendRequests
    },
    sentRequests() {
      return this.$store.getters.sentRequests
    },
    filteredRooms() {
      return this.rooms.filter(room => room.users.find(user => user.id === this.loggedInUser.uid))
    },
    filteredUsers() {
      return this.users.filter(user => {
        const isLoggedInUser = user.id === this.loggedInUser.uid
        const isFriend = this.friends.find(f => f.id === user.id)
        const hasRequest = this.friendRequests.find(f => f.id === user.id)
        // const hasSentRequest = this.sentRequests.find(r => r.id === user.id)
        return !isLoggedInUser && !isFriend && !hasRequest
      })
    },
    previewAvatar() {
      if (this.file) {
        return URL.createObjectURL(this.file)
      }
      if (this.profile.avatar) {
        return this.profile.avatar
      }
      return null
    },
    avatar() {
      return this.profile.avatar
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
      // this.previewAvatar = URL.createObjectURL(e.target.files[0])
    },
    upload() {
      this.isLoading = true
      const filename = `images/image-${Date.now()}.jpg`
      const storageRef = firebase.storage().ref()

      const imageRef = storageRef.child(filename)

      const _this = this
      imageRef.put(this.file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          db.collection('users')
            .doc(this.loggedInUser.uid)
            .update({ avatar: url })
            .then(() => {
              _this.isLoading = true
              _this.$bvModal.hide('modal-change-avatar')
            })
        })
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
      padding: 20px 10px;
      .profile {
        position: relative;
        .profile-info {
          .avatar {
            width: 60px;
            height: 60px;
            cursor: pointer;
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
      .footer {
        text-align: center;
        margin-top: 20px;
      }
    }

    .main {
      flex-grow: 1;
      background: radial-gradient($grey-light, $slate);
      position: fixed;
      height: 100vh;

      @media only screen and (min-width: 768px) {
        width: calc(720px - 265px);
        left: calc((100% - 720px) / 2 + 265px);
      }
      @media only screen and (min-width: 992px) {
        width: calc(960px - 265px);
        left: calc((100% - 960px) / 2 + 265px);
      }
      @media only screen and (min-width: 1200px) {
        width: calc(1140px - 265px);
        left: calc((100% - 1140px) / 2 + 265px);
      }
    }
  }
}
</style>

<style lang="scss">
#modal-change-avatar {
  .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 200px;
      height: 200px;
      border-radius: 150rem;
      object-fit: cover;
      object-position: center center;
      margin-bottom: 20px;
    }
    #file-select {
      margin-bottom: 20px;
    }
  }
}
</style>
