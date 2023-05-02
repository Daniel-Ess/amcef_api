import { Router } from 'express'
import * as Test from './get.test'
import validationMiddleware from '../../../middlewares/validationMiddleware'

const router = Router()

export default () => {
	router.get(
		'/',
		validationMiddleware(Test.schema),
		Test.workflow
	)

	return router
}
