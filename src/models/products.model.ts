import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config/database";
import Merchant from "./merchant.model";

export interface ProductsAttribute {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isAvailable: boolean;
  merchantId?: number;
  eta: string;
  bestSeller: number
  createdBy: string;
  updatedBy: string;
}

interface ProductsCreationAttributes extends Optional<ProductsAttribute, 'id'> {};

class Products extends Model<ProductsAttribute, ProductsCreationAttributes> implements ProductsAttribute {
  id!: number;
  name!: string;
  description!: string;
  imageUrl!: string;
  price!: number;
  isAvailable!: boolean;
  merchantId!: number;
  eta!: string;
  bestSeller!: number
  createdBy!: string;
  updatedBy!: string
};

Products.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    name: {type: new DataTypes.STRING(100), allowNull: false},
    description: {type: new DataTypes.STRING(255), allowNull: true},
    imageUrl: {type: new DataTypes.STRING(150), allowNull: true},
    price: {type: DataTypes.FLOAT, allowNull: false},
    isAvailable: {type: new DataTypes.BOOLEAN(), allowNull: false},
    merchantId: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false,  references: {model: Merchant, key: 'id'}},
    eta: {type: DataTypes.TIME, allowNull: false, defaultValue: '00:00:00'},
    bestSeller: {type: DataTypes.INTEGER, allowNull: true, defaultValue: 1},
    createdBy: {type: new DataTypes.STRING(50), allowNull: true},
    updatedBy: {type: new DataTypes.STRING(50), allowNull: true}
  }, {
    sequelize: sequelizeConnection,
    tableName: 'products'
  }
)

export default Products;

