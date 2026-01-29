import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

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
 *                   role:
 *                      type: number
 * 
 */
  
  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId: number = Number(req?.params?.id) || 0;
    try {
      const users = await this.userService.getUserById(userId);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user by Id', error });
    }
  };


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database.
 *     responses:
 *       200:
 *         description: A list of users.
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
 *                   role:
 *                      type: number
 * 
 */
  public async getAllUser(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUser();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  }
}

const userServiceInstance = new UserService();
export default new UserController(userServiceInstance);