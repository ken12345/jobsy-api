import User from "../models/user.model";
import type { UserAttributes } from "../models/user.model";
import bcrypt from 'bcryptjs';
import { WhereOptions } from 'sequelize';

export class UserService {

  public async getAllUser() {
    return User.findAll();
  }

  public async getUserById(id: number) {
    return User.findOne({
      where: {id}
    })
  }

   public async createUser(userData: { username: string; password: string, role: number }) {
    return User.create(userData);
  }

  public async login(userData: { username: string; password: string }) {
    try {
       const user = await User.findOne({
        where: { username: userData?.username } as WhereOptions<UserAttributes>,
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