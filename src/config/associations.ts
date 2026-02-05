import User from "../models/user.model";
import Merchant from "../models/merchant.model";
import Products from "../models/products.model";

Merchant.hasMany(User, { foreignKey: 'merchantId' });
User.belongsTo(Merchant, { foreignKey: 'merchantId' });

Merchant.hasMany(Products, {foreignKey: 'merchantId'});
Products.belongsTo(Merchant, {foreignKey: 'merchantId'})