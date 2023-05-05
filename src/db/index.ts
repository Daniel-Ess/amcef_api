import config from 'config'
import { Sequelize } from 'sequelize'

import { IDatabaseConfig } from '../types/interfaces'

const dbConfig: IDatabaseConfig = config.get('database')

const db = new Sequelize({
	host: dbConfig.host, // default localhost
	port: dbConfig.port, // default 5432
	database: dbConfig.name,
	username: dbConfig.user,
	password: dbConfig.pass,
	dialect: 'postgres',
	logging: false
})

db.authenticate()
	.then(() => console.log('Database connection has been established successfully.'))
	.catch((e: any) => console.error(`Unable to connect to the database ${e}.`))

export default db
