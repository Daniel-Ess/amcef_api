import { Model } from 'sequelize'

class DatabaseModel extends Model {
	static associate?: (models: any) => void
}

export default DatabaseModel
