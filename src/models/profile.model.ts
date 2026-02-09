import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import User from "./user.model";
import Role from "./role.model";

export interface ProfileAttribute {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  roleId: number;
  userId: number;
}

interface ProfileCreationAttributes extends Optional<ProfileAttribute, 'id'> {};

class Profile extends Model<ProfileAttribute , ProfileCreationAttributes> implements ProfileAttribute {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  contactNumber!: string;
  roleId!: number;
  userId!: number;
}


Profile.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    firstName: {type: new DataTypes.STRING(50), allowNull: false},
    lastName: {type: new DataTypes.STRING(50), allowNull: true},
    email: {type: new DataTypes.STRING(50), allowNull: false},
    contactNumber: {type: new DataTypes.STRING(50), allowNull: false},
    roleId: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false,  references: {model: Role, key: 'id'}},
    userId: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false,  references: {model: User, key: 'id'}},
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'profile',
  }
)

export default Profile;