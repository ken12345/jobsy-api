import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Merchant from "./merchant.model";

export interface RoleAttribute {
  id?: number;
  name: string;
  description: string;
  merchantId: number;
}

interface RoleCreationAttributes extends Optional<RoleAttribute, 'id'> {};

class Role extends Model<RoleAttribute , RoleCreationAttributes> implements RoleAttribute {
  id!: number;
  name!: string;
  description!: string;
  merchantId!: number;
}


Role.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    name: {type: new DataTypes.STRING(50), allowNull: false},
    description: {type: new DataTypes.STRING(255), allowNull: true},
    merchantId: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false,  references: {model: Merchant, key: 'id'}},
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'role',
  }
)

export default Role;