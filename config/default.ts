import { IServerConfig, IDatabaseConfig, IConfig } from '../src/types/interfaces'

export default {
	server: <IServerConfig>{
		port: 3000,
		domain: process.env.DOMAIN || 'http://localhost:3000',
		logDirectory: 'logs'
	},
	database: <IDatabaseConfig>{
		user: process.env.DB_USER || 'user',
		name: process.env.DB_NAME || 'name',
		pass: process.env.DB_PASS || 'pass',
	},
	jwt: {
		secret: process.env.JWT_SECRET
	}
} as IConfig
