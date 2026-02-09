import User from "../models/user.model";
import Merchant from "../models/merchant.model";
import Products from "../models/products.model";
import Profile from "../models/profile.model";
import Role from "../models/role.model";

Merchant.hasMany(User, { foreignKey: 'merchantId' });
User.belongsTo(Merchant, { foreignKey: 'merchantId' });

Merchant.hasMany(Products, {foreignKey: 'merchantId'});
Products.belongsTo(Merchant, {foreignKey: 'merchantId'});

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

Role.hasOne(Profile, { foreignKey: 'roleId' });
Profile.belongsTo(Role, { foreignKey: 'roleId' });

Merchant.hasMany(Role, {foreignKey: 'merchantId'});
Role.belongsTo(Merchant, {foreignKey: 'merchantId'});