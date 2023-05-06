import { Sequelize } from 'sequelize'

import DatabaseModel from '../../types/models'
// eslint-disable-next-line import/no-cycle
import { ListModel } from './list'

export class UserModel extends DatabaseModel {
	id: number
	name: string
	hash: string
	// FK
	lists: ListModel[]
	// metadata
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export default (sequelize: Sequelize, DataTypes: any) => {
	UserModel.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true
		},
		hash: {
			type: DataTypes.TEXT,
			allowNull: false
		},
	}, {
		paranoid: true,
		timestamps: true,
		sequelize,
		modelName: 'User'
	})

	UserModel.associate = (models) => {
		UserModel.belongsToMany(models.List, { through: models.UserList })
		UserModel.hasMany(models.Item, { foreignKey: 'createdBy' })
	}

	return UserModel
}
