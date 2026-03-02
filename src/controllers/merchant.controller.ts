import { Request, Response } from 'express';
import { MerchantService } from '../services/merchant.service';
import { UserService } from '../services/user.service';
import type { IMerchant } from '../interfaces/merchant.interface';
import { ProductsService } from '../services/products.service';
import { RoleService } from '../services/role.service';
import { FileService } from '../services/file.service';

class MerchantController {

  private merchantService: MerchantService;
  private userService: UserService;
  private productService: ProductsService;
  private roleService: RoleService
  
  constructor(merchantService: MerchantService, userService: UserService, productService: ProductsService, roleService: RoleService ) {
    this.merchantService = merchantService;
    this.userService = userService;
    this.productService = productService;
    this.roleService = roleService;
  }

  public async createMerchant(req:Request, res: Response) {
  
    const {  username, password} = req.body;
    try {
      const files = req?.files && !Array.isArray(req.files) ? req.files : {};
        console.log("kensh files", files)
      const newMerchant = await this.merchantService.createMerchant(req.body, files?.logo, files?.banner);
      const newUser = await this.userService.createUser({username, password, merchantId: newMerchant.id});
      const newRole = await this.roleService.createRole({name: "Admin", description: "Super User", merchantId: newMerchant.id })
      res.status(201).json({newMerchant, userId: newUser.id, newRole});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  public async getMerchantById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req?.params?.id) || 0;
    try {
      const merchant = await this.merchantService.getMerchantById(id);
      res.status(200).json(merchant);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user by Id', error });
      throw error
    }
  };

  public async getMerchantProducts(req: Request, res: Response) {
    const id: number = Number(req?.params?.id) || 0;
    try {
      const products = await this.productService.getAllByMerchant(id);
       res.status(200).json(products);
    } catch (error) {
       res.status(500).json({ message: 'Error retrieving products by merchantId', error });
      throw error
    }
  }

   public async deleteMerchant(req: Request, res: Response) {
    const id: number = Number(req?.params?.id);
    try {
      const result = await this.merchantService.deleteMerchantById(id);
       res.status(204).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting merchant by id'});
    }
  }
}


const fileServiceInstance = new FileService();
const merchantServiceInstance = new MerchantService(fileServiceInstance);
const userServiceInstance = new UserService();
const productInstance = new ProductsService();
const roleIntance = new RoleService();

export default new MerchantController(merchantServiceInstance, userServiceInstance, productInstance, roleIntance);

  /**
 * @swagger
 * /merchants:
 *   post:
 *     summary: Create a merchant
 *     description: create a merchant
 *     tags: [Merchants]
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              required:
 *                - merchantName
 *                - description
 *                - address
 *                - province
 *                - city
 *                - postalCode
 *                - openTime
 *                - closeTime
 *                - daysOpen
 *                - locationCoord
 *                - code
 *                - updatedBy
 *                - username
 *                - password
 *                - email
 *                - contactNumber
 *              properties:
 *                merchantName:
 *                  type: string
 *                  example: 'Jolliflea'
 *                description:
 *                  type: string
 *                  example: 'sa jolliflea, bida ang tanga'
 *                address:
 *                  type: string
 *                  example: 'Biglang liko street, Brgy. Tibay'
 *                city:
 *                  type: string
 *                  example: 'Amurao'
 *                province:
 *                  type: string
 *                  example: 'Oriental Mindoro'
 *                postalCode:
 *                  type: string
 *                  example: '5212'
 *                openTime:
 *                  type: string
 *                  example: '8am'
 *                closeTime:
 *                  type: string
 *                  example: '10pm'
 *                daysOpen:
 *                  type: string
 *                  example: 'Monday - Saturday'
 *                locationCoord:
 *                  type: string
 *                  example: '{"type": "Point","coordinates": [-74.0060, 40.7128]}'
 *                logo:
 *                  type: string
 *                  format: binary
 *                  description: The file to upload
 *                banner:
 *                  type: string
 *                  format: binary
 *                  description: The file to upload
 *                code:
 *                  type: string
 *                  example: 'JVXCP12TY8'
 *                updatedBy:
 *                  type: string
 *                  example: 'Boyong Manyalak'
 *                username:
 *                  type: string
 *                  example: 'test123'
 *                password:
 *                  type: string
 *                  example: '12345'
 *                email:
 *                  type: string
 *                  example: 'ken@gmail.com'
 *                contactNumber:
 *                  type: string
 *                  example: '091919090099'
 *     responses:
 *       201:
 *        description: Get merchant by ID successful
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

  /**
 * @swagger
 *  /merchants/{id}:
 *   get:
 *     summary: Get merchant by ID
 *     description: Retrieve a merchant using its id from db.
 *     tags: [Merchants]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the user to get
  *     responses:
 *       200:
 *        description: Create merchant successful
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */


/** 
  * @swagger
 *  /merchants/products/{id}:
 *   get:
 *     summary: Get all prodcuts by merchant id
 *     description: Retrieve a list of products using merchantId from db.
 *     tags: [Merchants]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the merchant to get all products
  *     responses:
 *       200:
 *        description: list of products found using merchantId
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

/**
 * @swagger
 *  /merchants/{id}:
 *   delete:
 *     summary: Delete merchant by id
 *     description: removing a merchant using its id from db.
 *     tags: [Merchants]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the merchant to get
  *     responses:
 *       204:
 *        description: Merchant deleted success
 */
