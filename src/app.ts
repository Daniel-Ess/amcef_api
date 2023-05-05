import express from 'express'
import config from 'config'
import passport from 'passport'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import helmet from 'helmet'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy } from 'passport-jwt'
import * as bodyParser from 'body-parser'
import { IServerConfig, IPassportConfig } from './types/interfaces'
import { localVerify, jwtVerify } from './passport'
// middlewares
import errorMiddleware from './middlewares/errorMiddleware'
import requestMiddleware from './middlewares/requestMiddleware'
// API
import v1 from './api/v1'

const serverConfig: IServerConfig = config.get('server')
const passportConfig: IPassportConfig = config.get('passport')

// ensure log directory exists
const logDirectory = path.resolve(process.cwd(), serverConfig.logDirectory)
// eslint-disable-next-line no-unused-expressions
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

passport.use('local', new LocalStrategy(passportConfig.local, localVerify))
passport.use('jwt-api', new JwtStrategy({ ...passportConfig.api, secretOrKey: passportConfig.secret }, jwtVerify))

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
