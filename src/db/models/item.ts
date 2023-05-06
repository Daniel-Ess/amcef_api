import { Sequelize } from 'sequelize'

import DatabaseModel from '../../types/models'
/* eslint-disable import/no-cycle */
import { UserModel } from './user'
import { ListModel } from './list'

import { ITEM_FLAG, ITEM_FLAGS } from '../../types/enums'

export class ItemModel extends DatabaseModel {
	id: number
	title: string
	description: string
	deadline: Date
	flag: ITEM_FLAG
	// FK
	listID: number
	list: ListModel
	createdBy: number
	user: UserModel
	// metadata
	createdAt: Date
	updatedAt: Date
	deletedAt: Date
}

export default (sequelize: Sequelize, DataTypes: any) => {
	ItemModel.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			unique: true
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		deadline: {
			type: DataTypes.DATE,
			allowNull: true
		},
		flag: {
			type: DataTypes.ENUM(...ITEM_FLAGS),
			allowNull: false,
			defaultValue: ITEM_FLAG.TODO
		},
		createdBy: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize,
		timestamps: true,
		paranoid: true,
		modelName: 'item'
	})

	ItemModel.associate = (models) => {
		ItemModel.belongsTo(models.List, { foreignKey: 'listID' })
		ItemModel.belongsTo(models.User, { foreignKey: 'createdBy' })
	}

	return ItemModel
}
