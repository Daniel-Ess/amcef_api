import http from 'http'
import config from 'config'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'

import app from './app'
import db from './db'
import models from './db/models'

import { IPassportConfig, IServerConfig } from './types/interfaces'

const serverConfig: IServerConfig = config.get('server')
const passportConfig: IPassportConfig = config.get('passport')
const httpServer = http.createServer(app)

db.sync().then(async () => {
	try {
		if (process.env.NODE_ENV === 'development') {
			const { User } = models
			const { name, password } = passportConfig.defaultUser
			const user = await User.findOne({
				where: {
					name: { [Op.eq]: name }
				}
			})
			if (!user) {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)

				await User.create({
					name,
					hash
				})
			}
		}
		console.log('Database schema is up to date.')
		return true
	} catch (e) {
		console.error(e)
		return e
	}
})

httpServer.listen(serverConfig.port).on('listening', () => {
	console.log(`Server started at port ${serverConfig.port} in ${process.env.NODE_ENV} mode`)
})

export default httpServer
