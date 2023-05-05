import { forEach } from 'lodash'
import { DataTypes } from 'sequelize'

// database connectioin
import db from '..'

// models
import defineUser from './user'
import defineList from './list'
import defineItem from './item'
import defineUserList from './userList'

const models = {
	User: defineUser(db, DataTypes),
	List: defineList(db, DataTypes),
	Item: defineItem(db, DataTypes),
	UserList: defineUserList(db, DataTypes)
}

forEach(models, (value) => {
	if (value.associate) {
		value.associate(models)
	}
})

export default models
