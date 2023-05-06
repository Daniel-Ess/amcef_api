import Joi from 'joi'
import { Op } from 'sequelize'
import { Request, Response, NextFunction } from 'express'

import models from '../../../../db/models'
import ErrorBuilder from '../../../../utils/ErrorBuilder'
import { ITEM_FLAG, ITEM_FLAGS, MESSAGE_TYPE } from '../../../../types/enums'
import { UserModel } from '../../../../db/models/user'

export const schema = Joi.object({
	body: Joi.object({
		flag: Joi.string().valid(...ITEM_FLAGS).optional().default(ITEM_FLAG.TODO)
	}),
	query: Joi.object(),
	params: Joi.object({
		itemID: Joi.number().integer().min(1).required()
	})
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List, UserList, Item } = models
		const { body, params } = req
		const user = <UserModel>req.user

		const item = await Item.findOne({
			attributes: ['id', 'title', 'description', 'deadline', 'flag', 'listID'],
			where: {
				id: {
					[Op.eq]: params.itemID
				}
			},
			include: [{
				model: List,
				attributes: ['id'],
				required: true
			}]
		})

		if (!item) {
			throw new ErrorBuilder(404, 'Item not found')
		}

		const authUserList = await UserList.findOne({
			where: {
				[Op.and]: [{
					listID: { [Op.eq]: item.list.id }
				}, {
					userID: { [Op.eq]: user.id }
				}]
			}
		})

		if (!authUserList) {
			throw new ErrorBuilder(403, 'List does not belongs to authenticated user')
		}

		await item.update({
			flag: body.flag
		})

		const messages = [{
			type: MESSAGE_TYPE.SUCCESS,
			message: 'Item updated successfully'
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
