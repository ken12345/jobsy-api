import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/database';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {};

class User extends Model<UserAttributes , UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  password!: string;
  role!: number;
}

User.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    username: {type: new DataTypes.STRING(50), allowNull: false},
    password: {type: new DataTypes.STRING(50), allowNull: false},
    role: {type: DataTypes.INTEGER, allowNull: false },

  },
  {
    sequelize: sequelizeConnection,
    tableName: 'user'
  }
)

export default User;

