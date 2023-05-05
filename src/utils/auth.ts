import { sign, SignOptions } from 'jsonwebtoken'
import config from 'config'
import bcrypt from 'bcryptjs'

import { IPassportConfig } from '../types/interfaces'

const BCRYPT_WORK_FACTOR_BASE = 13
const BCRYPT_DATE_BASE = 1483228800000
const BCRYPT_WORK_INCREASE_INTERVAL = 47300000000

const passportConfig: IPassportConfig = config.get('passport')

export const createJwt = (payload: Object, options: SignOptions, secret?: string): Promise<string> => (
	new Promise((resolve, reject) => {
		sign(payload, secret || passportConfig.secret, options, (err, token) => {
			if (err || !token) {
				return reject(err)
			}
			return resolve(token)
		})
	})
)

export const createHash = async (password: string): Promise<string> => {
	try {
		const BCRYPT_CURRENT_DATE = new Date().getTime()
		const BCRYPT_WORK_INCREASE = Math.max(0, Math.floor((BCRYPT_CURRENT_DATE - BCRYPT_DATE_BASE) / BCRYPT_WORK_INCREASE_INTERVAL))
		const BCRYPT_WORK_FACTOR = Math.min(19, BCRYPT_WORK_FACTOR_BASE + BCRYPT_WORK_INCREASE)

		const salt = await bcrypt.genSalt(BCRYPT_WORK_FACTOR)
		const hashedPassword = await bcrypt.hash(password, salt)

		return hashedPassword
	} catch (e) {
		return e
	}
}
