import User from "../models/user.model";
import Merchant from "../models/merchant.model";
import type { UserAttributes } from "../models/user.model";
import bcrypt from 'bcryptjs';
import { Model, WhereOptions } from 'sequelize';

export class UserService {

  public async getAllUser() {
    return User.findAll();
  }

  public async getUserById(id: number) {
    return User.findOne({
      where: {id},
      include: [{
        model: Merchant
      }]
    })
  }

   public async createUser(userData: { username: string; password: string, merchantId: number }) {
    return User.create(userData);
  }

  public async login(userData: { username: string; password: string }) {
    try {
       const user = await User.findOne({
        where: { username: userData?.username } as WhereOptions<UserAttributes>,
        include: [{model: Merchant}]
      });
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(userData?.password, user.password);
      if (!isPasswordValid) {
        return null;
      }
      const userWithoutPassword: Omit<UserAttributes, 'password'> = user.toJSON();
      delete (userWithoutPassword as UserAttributes).password;
      
      return userWithoutPassword;
    } catch (error) {
       console.error('Error during login:', error);
      throw new Error('An error occurred during login');
    }
  } 
}