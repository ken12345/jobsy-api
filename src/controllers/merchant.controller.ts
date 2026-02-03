import { Request, Response } from 'express';
import { MerchantService } from '../services/merchant.service';
import { UserService } from '../services/user.service';
import type { IMerchant } from '../interfaces/merchant.interface';
class MerchantController {

  private merchantService: MerchantService;
  private userService: UserService
  
  constructor(merchantService: MerchantService, userService: UserService ) {
    this.merchantService = merchantService;
    this.userService = userService;
  }

  /**
 * @swagger
 * /merchants:
 *   post:
 *     summary: Create a user
 *     description: create a merchant
 *     tags: [Merchants]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - merchantName
 *                - description
 *                - address
 *                - openTime
 *                - closeTime
 *                - locationCoord
 *                - availabilty
 *                - logo
 *                - code
 *                - updatedBy
 *                - username
 *                - password
 *              properties:
 *                merchantName:
 *                  type: string
 *                  example: 'Jolliflea'
 *                description:
 *                  type: string
 *                  example: 'sa jolliflea, bida ang tanga'
 *                address:
 *                  type: string
 *                  example: 'Biglang liko street, Brgy. Tibay, Amurao'
 *                openTime:
 *                  type: string
 *                  example: '8am'
 *                closeTime:
 *                  type: string
 *                  example: '10pm'
 *                locationCoord:
 *                  type: string
 *                  example: '{"type": "Point","coordinates": [-74.0060, 40.7128]}'
 *                availabilty:
 *                  type: boolean
 *                  example: true
 *                logo:
 *                  type: string
 *                  sample: 'https://www.bitezy.online/ken.jpg'
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
 *     responses:
 *       201:
 *        description: Get merchant by ID successful
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                id:
 *                  type: integer
 *                merchantName:
 *                  type: string
 *                description:
 *                  type: string
 *                address:
 *                  type: string
 *                openTime:
 *                  type: string
 *                closeTime:
 *                  type: string
 *                locationCoord:
 *                  type: string
 *                availabilty:
 *                  type: boolean
 *                logo:
 *                  type: string
 *                code:
 *                  type: string
 *                updatedBy:
 *                  type: string
 */

  /**
 * @swagger
 *  /merchants/{id}:
 *   get:
 *     summary: Get merchant by ID
 *     description: Retrieve a user using its id from db.
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
 *              properties:
 *                id:
 *                  type: integer
 *                merchantName:
 *                  type: string
 *                description:
 *                  type: string
 *                address:
 *                  type: string
 *                openTime:
 *                  type: string
 *                closeTime:
 *                  type: string
 *                locationCoord:
 *                  type: string
 *                availabilty:
 *                  type: boolean
 *                logo:
 *                  type: string
 *                code:
 *                  type: string
 *                updatedBy:
 *                  type: string
 */

  public async createMerchant(req:Request<{}, {}, IMerchant>, res: Response) {
    const { merchantName, description, address, openTime, closeTime, locationCoord, availabilty, logo, code, updatedBy, username, password} = req.body;
    try {
      const newMerchant = await this.merchantService.createMerchant({ merchantName, description, address, openTime, closeTime, locationCoord, availabilty, logo, code, updatedBy});
      const newUser = await this.userService.createUser({username, password, merchantId: newMerchant.id});
      res.status(201).json({newMerchant, userId: newUser.id });
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
}


const merchantServiceInstance = new MerchantService();
const userServiceInstance = new UserService()
export default new MerchantController(merchantServiceInstance, userServiceInstance)