import Role from "../models/role.model";


export class RoleService {

  public async createRole(roleData: {name: string, description: string, merchantId: number}) {
    return Role.create(roleData);
  }

  public async getAllRoleByMerchant(id: number) {
    return Role.findAll({
      where: {merchantId: id}
    });
  }

  public async getRoleById(id: number) {
    return Role.findByPk(id);
  }

  public deleteRoleById(id: number) {
    return Role.destroy({where: { id } });
  }
}
