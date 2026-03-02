import { DataTypes, Model, Optional, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelizeConnection from '../config/database';

export interface MerchantAttributes {
  id: number;
  merchantName: string;
  description?: string;
  address: string;
  openTime: string;
  closeTime: string;
  city: string;
  province: string;
  postalCode: string;
  locationCoord: string;
  daysOpen: string;
  code: string;
  updatedBy: string;
  email: string;
  contactNumber: string;
  logoURL?: string;
  bannerURL?: string;
}

interface MerchantCreationAttributes extends Optional<MerchantAttributes, 'id'> {};

class Merchant extends Model<MerchantAttributes , MerchantCreationAttributes> implements MerchantAttributes {
  id!: number;
  merchantName!: string;
  description!: string;
  address!: string;
  city!: string;
  province!: string;
  postalCode!: string;
  openTime!: string;
  closeTime!: string;
  locationCoord!: string;
  daysOpen!: string;
  code!: string;
  updatedBy!: string;
  email!: string;
  contactNumber!: string;
  logoURL!: string;
  bannerURL!: string;

}

Merchant.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    merchantName: {type: new DataTypes.STRING(100), allowNull: false},
    description: {type: new DataTypes.STRING(250), allowNull: true},
    address: {type: new DataTypes.STRING(250), allowNull: false},
    city: {type: new DataTypes.STRING(250), allowNull: false},
    province: {type: new DataTypes.STRING(250), allowNull: false},
    postalCode: {type: new DataTypes.STRING(250), allowNull: false},
    openTime: {type: new DataTypes.STRING(10), allowNull: false},
    closeTime: {type: new DataTypes.STRING(10), allowNull: false},
    daysOpen: {type: new DataTypes.STRING(250), allowNull: false},
    locationCoord: {type: new DataTypes.STRING(255), allowNull: false},
    code: {type: new DataTypes.STRING(50), allowNull: false},
    updatedBy: {type: new DataTypes.STRING(50), allowNull: false},
    email: {type: new DataTypes.STRING(50), allowNull: true},
    contactNumber: {type: new DataTypes.STRING(20), allowNull: true},
    logoURL: {type: new DataTypes.STRING(250), allowNull: true},
    bannerURL: {type: new DataTypes.STRING(250), allowNull: true},
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'merchant',
  }
)
export default Merchant;