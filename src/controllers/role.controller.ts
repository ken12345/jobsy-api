import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

interface IRole {
  name: string;
  description: string;
  merchantId: number;
}

class RoleController {
  private roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  public async createRole(req: Request<{}, {}, IRole>, res: Response) {
    try {
      const result = await this.roleService.createRole(req?.body);
       res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error creating role'});
    }
  }

  public async getAllRoleByMerchant(req: Request, res: Response) {
    const id: number = Number(req?.params?.id);
    try {
      const result = await this.roleService.getAllRoleByMerchant(id);
       res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error getting all roles by merchantId'});
    }
  }

  public async getRoleById(req: Request, res: Response) {
    const id: number = Number(req?.params?.id);
    try {
      const result = await this.roleService.getRoleById(id);
       res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error getting role by id'});
    }
  }

   public async deleteRole(req: Request, res: Response) {
    const id: number = Number(req?.params?.id);
    try {
      const result = await this.roleService.deleteRoleById(id);
       res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting role by id'});
    }
  }
}

const roleInstance = new RoleService();
export default new RoleController(roleInstance);



/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a role
 *     description: create a role in DB
 *     tags: [Roles]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - description
 *                - merchantId
 *              properties:
 *                name:
 *                  type: string
 *                  example: 'Staff'
 *                description:
 *                  type: string
 *                  example: 'A role that has access on orders'
 *                merchantId:
 *                  type: number
 *                  example: 0
 *     responses:
 *       201:
 *        description: Create a new Role successful
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */


/**
 * @swagger
 *  /roles/merchant/{id}:
 *   get:
 *     summary: Get role by Merchant ID
 *     description: Retrieve a merchant using merchant id from db.
 *     tags: [Roles]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the mechant to get
  *     responses:
 *       200:
 *        description: product found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

/**
 * @swagger
 *  /roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     description: Retrieve a merchant using role id from db.
 *     tags: [Roles]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the role to get
  *     responses:
 *       200:
 *        description: product found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

/**
 * @swagger
 *  /roles/{id}:
 *   delete:
 *     summary: Delete role by id
 *     description: removing a product using its id from db.
 *     tags: [Roles]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the product to get
  *     responses:
 *       204:
 *        description: Role deleted success
 */

