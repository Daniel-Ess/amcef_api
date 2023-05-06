import { Sequelize } from 'sequelize'

import DatabaseModel from '../../types/models'
// eslint-disable-next-line import/no-cycle
import { UserModel } from './user'
// eslint-disable-next-line import/no-cycle
import { ItemModel } from './item'

export class ListModel extends DatabaseModel {
	id: number
	name: string
	// FK
	users: UserModel[]
	items: ItemModel[]
	// metadata
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export default (sequelize: Sequelize, DataTypes: any) => {
	ListModel.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				unique: true
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			}
		},
		{
			sequelize,
			timestamps: true,
			paranoid: true,
			modelName: 'list'
		}
	)

	ListModel.associate = (models) => {
		ListModel.hasMany(models.Item, { foreignKey: 'listID' })
		ListModel.belongsToMany(models.User, { through: models.UserList })
	}

	return ListModel
}
