import { Router } from 'express'

import TestRouter from './test'

const router = Router()

export default () => {
	router.use('/test', TestRouter())

	return router
}
