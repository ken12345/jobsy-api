import User from "../models/user.model";
import Merchant from "../models/merchant.model";


Merchant.hasOne(User, { foreignKey: 'merchantId' });
User.belongsTo(Merchant, { foreignKey: 'merchantId' });
// Merchant.hasMany(User, {foreignKey: 'merchantId'});