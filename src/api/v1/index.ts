import { Router } from 'express'

import AuthRouter from './auth'

const router = Router()

export default () => {
	router.use('/auth', AuthRouter())

	return router
}
