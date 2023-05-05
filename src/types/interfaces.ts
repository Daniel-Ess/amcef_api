import { JwtFromRequestFunction } from 'passport-jwt'

export interface IServerConfig {
	port: number
	domain: string
	logDirectory: string
}

export interface IDatabaseConfig {
	user: string
	name: string
	pass: string
	host: string
	port: string
}

export interface IErrorBuilderItem {
	message: string
	type: string
	path?: string
}

interface IPassportJWTConfig {
	jwtFromRequest: JwtFromRequestFunction
	exp: string
	audience: string
	passReqToCallback: boolean
}

export interface IPassportConfig {
	secret: string
	defaultUser: string
	defaultPass: string
	api: IPassportJWTConfig
}

export interface IConfig {
	server: IServerConfig
	database: IDatabaseConfig
	passport: IPassportConfig
}
