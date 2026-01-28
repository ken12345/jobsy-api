import { Request, Response, NextFunction, RequestHandler } from 'express';
import type { IUser } from '../interfaces/user.interface';

export class UserController {

    users: IUser[] = [
      {id: 1, username: "ken", password: "123", role: 0},
      {id: 2, username: "funks", password: "123", role: 1},
      {id: 3, username: "boks", password: "123", role: 0}
    ];

  
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
  
  public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req?.params?.id;

    const user = this.users.find((el: IUser) => el?.id === Number(userId));
    if(!user) {
      res.json({ok: true, error: "user not found"});
      return;
    }
    res.json(user);
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
  public async getAllUser(req: Request, res: Response, next: NextFunction) {
    res.json(this.users);
  }
}