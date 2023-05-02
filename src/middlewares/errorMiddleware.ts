import util from 'util'
import { Request, NextFunction, Response } from 'express'
import { isEmpty } from 'lodash'

// utils
import logger from '../utils/logger'
import { MESSAGE_TYPE } from '../types/enums'
import ErrorBuilder from '../utils/ErrorBuilder'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: ErrorBuilder, req: Request, res: Response, _next: NextFunction) => {
	if (req.app.get('env') === 'development') {
		// eslint-disable-next-line no-console
		console.log(err)
	}

	// if status does not exist, assign 500
	const errStatus = err.status || 500

	// add this line to include winston logging
	logger.error(`${errStatus} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
	logger.error(`stack: ${JSON.stringify(util.inspect(err))} \n`)

	let messages

	if (errStatus < 500) {
		if (err.isJoi || !isEmpty(err.items)) {
			messages = err.items
		} else {
			messages = [err.message]
		}
	} else {
		messages = [{
			message: 'Something went wrong!',
			type: MESSAGE_TYPE.ERROR
		}]
	}

	// render the error page
	return res.status(errStatus).json({ messages })
}
