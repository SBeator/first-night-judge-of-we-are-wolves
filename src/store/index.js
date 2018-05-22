// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const STATUS = {
  IDLE: 'IDLE',
  SEATED_DOWN: 'SEATED_DOWN',
  READY: 'READY',
  STARTED: 'STARTED'
}

export const ROLES = {
  MERLIN: '梅林',
  ASSASSIN: '刺客',
  PERCIVAL: '派西维尔',
  MORGANA: '莫甘娜',
  MORDRED: '莫德雷德',
  OBERON: '奥伯伦',
  GOODGUY: '亚瑟忠臣',
  BADGUY: '爪牙'
}

export const SIDE = {
  GOOD: 'GOOD',
  BAD: 'BAD',
}

const store = new Vuex.Store({
  state: {
    userInfo: {},
    seatDatas: new Array(8).fill({}),
    userSeatNumber: -1,
    roomId: '',
    game: {
      status: STATUS.IDLE,
      host: false,
    },
    role: {
      name: '',
      message: '',
      otherUsers: []
    },
    gameType: {
      playerNumber: 7,
      hasMerlin: true,
      hasAssassin: true,
      hasPercival: true,
      hasMorgana: true,
      hasMordred: false,
      hasOberon: false,
    }
  },
  getters: {
    readyStart: state => {
      return state.game.host && state.game.status === 'READY'
    }
  },
  mutations: {
    test: (state, {
      count
    }) => {
      console.log('test', count)
    },

    updateUserInfo: (state, {
      userInfo
    }) => {
      state.userInfo = userInfo
    },

    changeGameType: (state, {
      gameType
    }) => {
      state.gameType = {
        ...state.gameType,
        ...gameType
      }
    },

    createRoom: (state) => {
      state.seatDatas = new Array(state.gameType.playerNumber).fill({})
      state.game = {
        status: STATUS.IDLE,
        host: true,
      }
      state.roomId = Math.floor(1000 + Math.random() * 9000) + ''

      wx.navigateTo({
        url: '/pages/room/main'
      })
    },

    joinRoom: (state, {
      roomId
    }) => {
      state.roomId = roomId
      wx.navigateTo({
        url: '/pages/room/main'
      })
    },

    leaveSeat: (state, {
      seatNumber
    }) => {
      Vue.set(state.seatDatas, seatNumber, {})
    },

    seatDown: function (state, {
      seatNumber,
      userInfo
    }) {
      const userSeatNumber = seatNumber
      const {
        userSeatNumber: previousSeat,
        seatDatas
      } = state

      if (seatDatas[userSeatNumber] && seatDatas[userSeatNumber].avatarUrl) {
        return
      }

      if (!userInfo) {
        userInfo = state.userInfo

        if (previousSeat >= 0) {
          this.commit('leaveSeat', {
            seatNumber: previousSeat
          })
        }

        state.userSeatNumber = userSeatNumber
      }

      Vue.set(seatDatas, userSeatNumber, {
        avatarUrl: userInfo.avatarUrl
      })

      state.seatDatas = seatDatas

      if (seatDatas.filter(data => !data.avatarUrl).length) {
        state.game.status = STATUS.SEATED_DOWN
      } else {
        state.game.status = STATUS.READY
      }
    },

    setRole(state, {
      role
    }) {
      state.role = role
    },

    startGame(state) {
      state.game.status = STATUS.STARTED
    }
  },

  actions: {
    startGame: ({
      commit,
      state
    }) => {
      commit('startGame')

      // TODO: change this to real call
      commit('setRole', {
        role: {
          name: ROLES.MERLIN,
          side: SIDE.BAD,
          message: '其他的反派角色是',
          otherUsers: [2, 3]
        }
      })
    }
  }
})

export default store
