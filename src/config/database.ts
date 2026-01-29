
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST,  process.env.DB_PORT)
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT as string, 10),
    logging: false
  }
)
export default sequelize;