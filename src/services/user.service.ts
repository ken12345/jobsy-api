import User from "../models/user.model";

export class UserService {

  public async getAllUser() {
    return User.findAll();
  }

  public async getUserById(id: number) {
    return User.findOne({
      where: {id}
    })
  }

   public async createUser(userData: { username: string; password: string, role: number, dateCreated: Date, dateUpdated: Date }) {
    return User.create(userData);
  }
}