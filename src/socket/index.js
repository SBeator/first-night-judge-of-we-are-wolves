import io from './mockServer'
import store from '@/store'

const events = [
  'test',
  'seatDown'
]

export default () => {
  const socket = io.connect()

  events.forEach(event => {
    socket.on(event, data => {
      store.commit(event, data)
    })
  })
}