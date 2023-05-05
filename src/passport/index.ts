import { Request } from 'express'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
// passport
import { IVerifyOptions } from 'passport-local'
import { VerifiedCallback } from 'passport-jwt'
// models
import models from '../db/models'
// interfaces
import { IJwtPayload } from '../types/interfaces'
// error builder
import ErrorBuilder from '../utils/ErrorBuilder'

export const localVerify = async (req: Request, name: string, password: string, done: (error: any, userCallback?: any, options?: IVerifyOptions) => void) => {
	const {
		User
	} = models

	try {
		const user = await User.findOne({
			where: {
				name: { [Op.eq]: name }
			}
		})

		let errorMessage

		if (!user) {
			errorMessage = 'Incorrect login credentials'
		} else {
			const passComparation = await bcrypt.compare(password, user.hash)
			if (!passComparation) {
				errorMessage = 'Incorrect login credentials'
			}
		}

		if (errorMessage) {
			return done(null, false, { message: errorMessage })
		}

		return done(null, user)
	} catch (e) {
		return done(e)
	}
}

export const jwtVerify = async (req: Request, payload: IJwtPayload, done: VerifiedCallback) => {
	try {
		const { User } = models
		const user = await User.findOne({
			where: {
				id: { [Op.eq]: payload.uid }
			}
		})

		if (!user) {
			throw new ErrorBuilder(401, 'User does not exist')
		}

		return done(null, user)
	} catch (e) {
		return done(e)
	}
}
