import { Request, Response, NextFunction } from 'express'
import { uniq, map } from 'lodash'
import Joi from 'joi'
import { Op, Transaction } from 'sequelize'

import db from '../../../db'
import models from '../../../db/models'

import ErrorBuilder from '../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../types/enums'
import { UserModel } from '../../../db/models/user'

export const schema = Joi.object({
	body: Joi.object({
		name: Joi.string().max(50).required(),
		userIDs: Joi.array().items(Joi.number().integer().min(1).required()).optional().default([])
	}),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	let transaction: Transaction
	try {
		const { User, List, UserList } = models
		const { body } = req
		const user = <UserModel>req.user

		const userIDs = [...body.userIDs, user.id]
		const uniqUserIDs = uniq(userIDs)

		const users = await User.findAll({
			where: {
				id: {
					[Op.in]: uniqUserIDs
				}
			}
		})

		if (users.length !== uniqUserIDs.length) {
			throw new ErrorBuilder(404, 'User not found')
		}

		transaction = await db.transaction()

		const list = await List.create({
			name: body.name
		}, { transaction })

		await UserList.bulkCreate(map(uniqUserIDs, (userID: number) => ({
			listID: list.id,
			userID
		})), { transaction })

		await transaction.commit()

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'List created successfully'
		}]

		return res.json({
			messages,
			list: {
				id: list.id,
			}
		})
	} catch (error) {
		if (transaction) {
			await transaction.rollback()
		}
		return next(error)
	}
}
