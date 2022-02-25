import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers'
import io from 'socket.io-client'

export default boot(({ app }) => {
  const protocol = location.protocol == 'http:' ? 'ws://' : 'wss://';
  const url = `${protocol}${location.host}`
  const ws = io(url, {
    upgrade: true,
    autoConnect: true,
    transports: ['websocket']
  })
  ws.on('connect', () => {
    Notify.create({
      progress: true,
      position: 'bottom',
      message: `成功建立ws连接 ${ws.id}`
    });
  });
  app.provide('ws', ws)
})
