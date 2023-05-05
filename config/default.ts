import { ExtractJwt } from 'passport-jwt'

import {
	IServerConfig, IDatabaseConfig, IConfig, IPassportConfig
} from '../src/types/interfaces'

export default {
	server: <IServerConfig>{
		port: 3000,
		domain: process.env.DOMAIN || 'http://localhost:3000',
		logDirectory: 'logs'
	},
	database: <IDatabaseConfig>{
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || '5432',
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		dialect: 'postgres'
	},
	passport: <IPassportConfig>{
		secret: process.env.JWT_SECRET,
		defaultUser: process.env.DEFAULT_USER || 'user',
		defaultPass: process.env.DEFAULT_USER || 'pass',
		api: {
			exp: '2h',
			audience: 'jwt-api',
			jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('t')]),
			passReqToCallback: true
		}
	}
} as IConfig
