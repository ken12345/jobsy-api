import { DataTypes, Model, Optional, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelizeConnection from '../config/database';
import bcrypt from 'bcryptjs';
import Merchant from './merchant.model';

export interface UserAttributes {
  id: number;
  username: string;
  password?: string;
  merchantId?: number
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {};

class User extends Model<UserAttributes , UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  password!: string;
  merchantId!: number;
  public validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    username: {type: new DataTypes.STRING(50), allowNull: false},
    password: {type: new DataTypes.STRING(250), allowNull: false},
    merchantId: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false,  references: {model: Merchant, key: 'id'}}

  },
  {
    sequelize: sequelizeConnection,
    tableName: 'user',
     hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
)

export default User;

