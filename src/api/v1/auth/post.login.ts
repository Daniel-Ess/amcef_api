import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import config from 'config'

// utils
import { createJwt } from '../../../utils/auth'

// types
import { IPassportConfig } from '../../../types/interfaces'
import { UserModel } from '../../../db/models/user'

const passportConfig: IPassportConfig = config.get('passport')

export const schema = Joi.object({
	body: Joi.object({
		name: Joi.string().max(50).required(),
		password: Joi.string().max(255).required()
	}),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authUser = <UserModel>req.user

		const [accessToken] = await Promise.all([
			createJwt({ uid: authUser.id }, { audience: passportConfig.api.audience, expiresIn: passportConfig.api.exp }),
		])

		const profile = {
			id: authUser.id,
			name: authUser.name
		}

		return res.json({ accessToken, profile })
	} catch (error) {
		return next(error)
	}
}
