import {
	Router, Request, Response, NextFunction
} from 'express'
import passport from 'passport'
// endpoints
import * as postLogin from './post.login'
import * as postRegister from './post.register'
// middlewares
import validationMiddleware from '../../../middlewares/validationMiddleware'
// error builder
import ErrorBuilder from '../../../utils/ErrorBuilder'

const router = Router()

export default () => {
	router.post(
		'/login',
		validationMiddleware(postLogin.schema),
		(req: Request, res: Response, next: NextFunction) => {
			passport.authenticate('local', { session: false }, (err: any, userData: any, message: any) => {
				try {
					if (err) {
						return next(err)
					}
					if (!userData) {
						throw new ErrorBuilder(401, message.message)
					}

					req.user = userData
					return next()
				} catch (e) {
					return next(e)
				}
			})(req, res)
		},
		postLogin.workflow
	)

	router.post(
		'/register',
		passport.authenticate('jwt-api', { session: false }),
		validationMiddleware(postRegister.schema),
		postRegister.workflow
	)

	return router
}
