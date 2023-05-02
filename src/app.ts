import express from 'express'
import config from 'config'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import helmet from 'helmet'
import * as bodyParser from 'body-parser'
import { IServerConfig } from './types/interfaces'

// middlewares
import errorMiddleware from './middlewares/errorMiddleware'
import requestMiddleware from './middlewares/requestMiddleware'

// API
import v1 from './api/v1'

const serverConfig: IServerConfig = config.get('server')

// ensure log directory exists
const logDirectory = path.resolve(process.cwd(), serverConfig.logDirectory)
// eslint-disable-next-line no-unused-expressions
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const app = express()

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/apidoc', express.static('apidoc'))
app.use(requestMiddleware)
app.use('/api/v1', v1())
app.use(errorMiddleware)

export default app
