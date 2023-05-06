import { Router } from 'express'
import passport from 'passport'
// endpoints
import * as getLists from './get.lists'
import * as postList from './post.list'
import * as postShare from './post.share'
import * as postItem from './item/post.item'
import * as patchItemFlag from './item/patch.flag'
// middlewares
import validationMiddleware from '../../../middlewares/validationMiddleware'

const router = Router()

export default () => {
	// Get all lists with items
	router.get(
		'/',
		validationMiddleware(getLists.schema),
		getLists.workflow
	)
	// Create a new list
	router.post(
		'/',
		passport.authenticate('jwt-api', { session: false }),
		validationMiddleware(postList.schema),
		postList.workflow
	)
	// Add list to new user
	router.post(
		'/:listID/share/:userID',
		passport.authenticate('jwt-api', { session: false }),
		validationMiddleware(postShare.schema),
		postShare.workflow
	)
	// Add item to list
	router.post(
		'/:listID/item',
		passport.authenticate('jwt-api', { session: false }),
		validationMiddleware(postItem.schema),
		postItem.workflow
	)
	// Update item
	router.patch(
		'/item/:itemID/flag',
		passport.authenticate('jwt-api', { session: false }),
		validationMiddleware(patchItemFlag.schema),
		patchItemFlag.workflow
	)

	return router
}
