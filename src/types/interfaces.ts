import { JwtFromRequestFunction } from 'passport-jwt'
import { IStrategyOptionsWithRequest as IPassportLocalStrategyOptions } from 'passport-local'

export interface IServerConfig {
	port: number
	domain: string
	logDirectory: string
}

export interface IDatabaseConfig {
	host: string
	port: number
	user: string
	name: string
	pass: string
}

export interface IErrorBuilderItem {
	message: string
	type: string
	path?: string
}

export interface IPassportJWTConfig {
	jwtFromRequest: JwtFromRequestFunction
	exp: string
	audience: string
	passReqToCallback: boolean
}

export interface IDefaultUserConfig {
	name: string
	password: string
}

export interface IJwtPayload {
	uid: number
	exp: number
	aud: string
}

export interface IPassportConfig {
	secret: string
	defaultUser: IDefaultUserConfig
	local: IPassportLocalStrategyOptions
	api: IPassportJWTConfig
}

export interface IConfig {
	server: IServerConfig
	database: IDatabaseConfig
	passport: IPassportConfig
}
