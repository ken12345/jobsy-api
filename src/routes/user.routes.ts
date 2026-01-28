import express, { Router, Request, Response } from 'express';
import  type {IUser} from '../interfaces/user.interface';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const sampleUser: IUser = {
    username: "Ken pogi",
    password: "123456",
    role: 0
  };
  res.send([sampleUser]);
});

export default router;