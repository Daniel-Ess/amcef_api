import { Sequelize } from 'sequelize'

import DatabaseModel from '../../types/models'

import { UserModel } from './user'
import { ListModel } from './list'

export class UserListModel extends DatabaseModel {
	// FK
	listID: number
	list: UserModel
	userID: number
	user: ListModel
	// metadata
	createdAt: Date
	updatedAt: Date
}
export default (sequelize: Sequelize, DataTypes: any) => {
	UserListModel.init({
		listID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		}
	}, {
		timestamps: true,
		sequelize,
		modelName: 'UserList'
	})
	UserListModel.associate = (models) => {
		UserListModel.belongsTo(models.List, { foreignKey: 'listID' })
		UserListModel.belongsTo(models.User, { foreignKey: 'userID' })
	}

	return UserListModel
}
