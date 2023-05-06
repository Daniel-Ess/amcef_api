import Joi from 'joi'
import { Op } from 'sequelize'
import { Request, Response, NextFunction } from 'express'

import models from '../../../../db/models'
import ErrorBuilder from '../../../../utils/ErrorBuilder'
import { MESSAGE_TYPE } from '../../../../types/enums'
import { UserModel } from '../../../../db/models/user'

export const schema = Joi.object({
	body: Joi.object({
		title: Joi.string().max(50).required(),
		description: Joi.string().max(255).required(),
		deadline: Joi.date().iso().required()
	}),
	query: Joi.object(),
	params: Joi.object({
		listID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List, UserList, Item } = models
		const { body, params } = req
		const user = <UserModel>req.user

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
					userID: { [Op.eq]: user.id }
				}]
			}
		})

		if (!authUserList) {
			throw new ErrorBuilder(403, 'List does not belongs to authenticated user')
		}

		const item = await Item.create({
			title: body.title,
			description: body.description,
			deadline: body.deadline,
			listID: list.id,
			createdBy: user.id
		})

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'Item created successfully'
		}]

		return res.json({
			messages,
			item: {
				id: item.id,
			}
		})
	} catch (error) {
		return next(error)
	}
}
