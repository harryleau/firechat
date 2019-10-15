<template>
  <div id="room-list">
    <div class="header">
      <h3 class="heading-3">Chat Rooms</h3>
      <span class="add-icon" v-b-modal.modal-create-room>+</span>
    </div>
    <room-list-item
      v-for="(room, i) in rooms"
      :key="i"
      :activeRoom="activeRoom"
      :room="room"
      @select-room="$emit('select-room', $event)"
    />
    <create-room @create-room="$emit('create-room', $event)" />
  </div>
</template>
<script>
import RoomListItem from './room-list-item'
import CreateRoom from '@/components/rooms/create-room'
export default {
  name: 'room-list',
  components: {
    RoomListItem,
    CreateRoom
  },
  props: {
    rooms: Array,
    activeRoom: Object
  },
  computed: {}
}
</script>

<style scoped lang="scss">
#room-list {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
