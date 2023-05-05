import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { Op, Transaction } from 'sequelize'

import models from '../../../db/models'

// utils
import { MESSAGE_TYPE } from '../../../types/enums'
import ErrorBuilder from '../../../utils/ErrorBuilder'
import { createHash } from '../../../utils/auth'

export const schema = Joi.object({
	body: Joi.object({
		name: Joi.string().max(50).required(),
		password: Joi.string().max(255).required()
	}),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	let transaction: Transaction
	try {
		const { body } = req
		const {
			User
		} = models

		const nameDuplicateUser = await User.findOne({
			where: {
				name: { [Op.eq]: body.name }
			}
		})

		if (nameDuplicateUser) {
			throw new ErrorBuilder(409, 'User with the specified name already exists')
		}

		const password = await createHash(body.password)

		const newUser = await User.create({
			name: body.name,
			password
		})

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'User created successfully'
		}]

		return res.json({
			messages,
			user: {
				id: newUser.id,
				name: newUser.name
			}
		})
	} catch (error) {
		if (transaction) {
			await transaction.rollback()
		}
		return next(error)
	}
}
