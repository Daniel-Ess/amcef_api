export interface IServerConfig {
	port: number
	domain: string
	logDirectory: string
}

export interface IDatabaseConfig {
	user: string
	name: string
	pass: string
}

export interface IErrorBuilderItem {
	message: string
	type: string
	path?: string
}

export interface IConfig {
	server: IServerConfig
	database: IDatabaseConfig
}
