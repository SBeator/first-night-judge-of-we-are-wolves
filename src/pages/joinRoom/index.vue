<template>
  <div class="joinroom-warp">
    <p class="title">请输入要加入的房间号</p>
    <input v-model="roomId" auto-focus="" class="weui-input" placeholder="请在这输入房间号" />
    <button type="primary" :loading="joining" @click="joinRoom()">加入房间</button>
  </div>
</template>

<script>
import store, { STATUS } from '@/store'

export default {
  data: {
    roomId: '',
  },

  computed: {
    joining() {
      return store.state.game.status === STATUS.LOADING
    },
  },

  methods: {
    joinRoom() {
      store.dispatch('joinRoom', { roomId: this.roomId })
    },
  },
}
</script>
<style>
.joinroom-warp {
  padding: 40rpx;
}

.title {
  margin: 100rpx 0;
  text-align: center;
  font-size: 60rpx;
  font-weight: bold;
}

input {
  margin-left: auto;
  margin-right: auto;
  padding: 28rpx;
  height: auto;
  box-sizing: border-box;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  line-height: 40rpx;
  border-radius: 5px;
  border: 1px solid #ddd;
  overflow: hidden;
  color: #000000;
}

button {
  margin-top: 120rpx;
}
</style>
