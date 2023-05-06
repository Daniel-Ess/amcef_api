import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import models from '../../../db/models'

export const schema = Joi.object({
	body: Joi.object(),
	query: Joi.object(),
	params: Joi.object()
})

export const workflow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { List, Item } = models

		const lists = await List.findAll({
			attributes: ['id', 'name'],
			include: [{
				model: Item,
				attributes: ['id', 'title', 'description', 'deadline', 'flag', 'createdBy']
			}]
		})

		return res.json({
			lists
		})
	} catch (error) {
		return next(error)
	}
}
