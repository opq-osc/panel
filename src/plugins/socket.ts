import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
// import { io, ManagerOptions } from 'socket.io-client'
import * as io from 'socket.io-client'

// const options: Partial<ManagerOptions> = {
// 	upgrade: true,
// 	secure: true,
// 	reconnection: true,
// 	rejectUnauthorized: false,
// 	transports: ['websocket'],
// 	query: { EIO: '3', transport: 'websocket' }
// }
Vue.use(
	new VueSocketIO({
		connection: io(`ws://${location.host}`, {
			upgrade: true,
			secure: true,
			reconnection: true,
			rejectUnauthorized: false,
			transports: ['websocket'],
			query: { EIO: '3', transport: 'websocket' }
		})
	})
)
