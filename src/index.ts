import http from 'http'
import config from 'config'

import app from './app'
import { IServerConfig } from './types/interfaces'

const serverConfig: IServerConfig = config.get('server')
const httpServer = http.createServer(app)

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server started at port ${serverConfig.port} in ${process.env.NODE_ENV} mode`)
})

export default httpServer
