import { Router } from 'express'

import AuthRouter from './auth'
import ListRouter from './list'

const router = Router()

export default () => {
	router.use('/auth', AuthRouter())
	router.use('/list', ListRouter())

	return router
}
