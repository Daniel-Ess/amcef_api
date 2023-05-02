import supertest from 'supertest'
import Joi from 'joi'

import app from '../../../../src/app'

const endpoint = '/api/v1/test'

const validationScheme = Joi.object({
	test: Joi.boolean().required(),
})

describe(`[GET] ${endpoint})`, () => {
	const request = supertest(app)

	it('Response should return code 200', async () => {
		const response = await request.get(endpoint)
			.set('Content-Type', 'application/json')
		expect(response.status).toBe(200)
		expect(response.type).toBe('application/json')

		const validationResult = validationScheme.validate(response.body)
		expect(validationResult.error).toBeUndefined()
	})
})
