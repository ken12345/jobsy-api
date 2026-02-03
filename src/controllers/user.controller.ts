import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import type { IUser } from '../interfaces/user.interface';
class UserController {

  private userService: UserService;

   constructor(userService: UserService) {
    this.userService = userService;
  }

/**
 * @swagger
 *  /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user using its id from db.
 *     tags: [Users]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: An user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   password:
 *                      type: string
 *                   merchantId:
 *                      type: number
 * 
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     description: create a user in DB
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *                - merchantId
 *              properties:
 *                username:
 *                  type: string
 *                  example: 'ken_pogi'
 *                password:
 *                  type: string
 *                  example: 'ken_123'
 *                merchantId:
 *                  type: integer
 *                  sample: 1
 *     responses:
 *       201:
 *        description: Create a new User successful
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                merchantId:
 *                  type: number
 */

  /**
 * @swagger
 * /users/authenticate:
 *   post:
 *     summary: User authentication
 *     description: authenticate user when logging in
 *     tags: [Users]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                  example: 'ken_pogi'
 *                password:
 *                  type: string
 *                  example: 'ken_123'
 *     responses:
 *       201:
 *        description: User is authenticated
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                merchantId:
 *                  type: number
 */
  
  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId: number = Number(req?.params?.id) || 0;
    try {
      const users = await this.userService.getUserById(userId);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user by Id', error });
      throw error
    }
  };



  public async createUser(req: Request<{}, {}, IUser>, res: Response) {
    const { username, password, merchantId } = req.body;
    try {
      const newUser = await this.userService.createUser({username, password, merchantId})
      res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

   public async authenticateUser(req: Request<{}, {}, IUser>, res: Response) {
    const { username, password } = req.body;
    try {
      const user = await this.userService.login({username, password});
       res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Invalid User' });
    }
  }
}


const userServiceInstance = new UserService();
export default new UserController(userServiceInstance);