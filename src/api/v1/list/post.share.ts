import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { Op } from 'sequelize'

import models from '../../../db/models'
import ErrorBuilder from '../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../types/enums'
import { UserModel } from '../../../db/models/user'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object({
		listID: Joi.number().integer().min(1).required(),
		userID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { User, List, UserList } = models
		const { params } = req
		const authUser = <UserModel>req.user

		const user = await User.findOne({
			where: {
				id: {
					[Op.eq]: params.userID
				}
			}
		})

		if (!user) {
			throw new ErrorBuilder(404, 'User not found')
		}

		const list = await List.findOne({
			where: {
				id: {
					[Op.eq]: params.listID
				}
			}
		})

		if (!list) {
			throw new ErrorBuilder(404, 'List not found')
		}

		const authUserList = await UserList.findOne({
			where: {
				[Op.and]: [{
					listID: { [Op.eq]: list.id }
				}, {
					userID: { [Op.eq]: authUser.id }
				}]
			}
		})

		if (!authUserList) {
			throw new ErrorBuilder(403, 'List does not belongs to authenticated user')
		}

		await UserList.create({
			userID: user.id,
			listID: list.id
		})

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'List shared to user successfully'
		}]

		return res.json({
			messages
		})
	} catch (error) {
		return next(error)
	}
}
