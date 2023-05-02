import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'

import ErrorBuilder from '../utils/ErrorBuilder'

const options = {
	abortEarly: false
}

export default (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
	if (!schema) {
		throw new Error('Validation schema is not provided')
	}
	const { query, body, params } = req

	Object.keys(query || {}).forEach((key) => {
		if (query[key] === 'null') {
			query[key] = null
		}
	})

	const result = schema.validate({ query, body, params }, options)
	if (result.error) {
		throw new ErrorBuilder(400, result.error.details)
	}

	req.body = result.value.body
	req.query = result.value.query
	req.params = result.value.params
	return next()
}
