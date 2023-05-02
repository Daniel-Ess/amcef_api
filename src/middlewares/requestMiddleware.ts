import util from 'util'
import { Request, Response, NextFunction } from 'express'

// utils
import logger from '../utils/logger'

export default (req: Request, res: Response, next: NextFunction) => {
	try {
		logger.info(`url - [${req.method}] ${req.originalUrl}`)
		logger.info(`header - ${JSON.stringify(util.inspect(req.headers))}`)
		logger.info(`query - ${JSON.stringify(util.inspect(req.query))}`)
		logger.info(`body - ${JSON.stringify(util.inspect(req.body))} \n`)
		return next()
	} catch (e) {
		return next(e)
	}
}
