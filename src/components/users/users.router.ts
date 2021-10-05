import express, { Request, Response } from 'express';
import * as UserService from './users.service';
import { checkValidEmail, respMsg } from '../../utils/helper';
import { MESSAGES } from '../../utils/constants';
import { auth } from '../../utils/auth';

export const userRouter = express.Router();

userRouter.get('/',auth, async ( req: Request, res: Response) => {
  try {
    
    if(!req.query.username || !checkValidEmail(req.query.username)){
      console.log("----Invalid username or username is not there------");

      const msg = await respMsg(400,MESSAGES.BAD_REQUEST,[]);

      res.status(msg.statusCode).send(msg);
    }else{

      let obj = {
        username: req.query.username
      };

      const result = await UserService.getUser(obj);

      res.status(200).send(result);
    }
    
  }
  catch (e) {
    res.status(500).send(e);
  }
});

userRouter.post('/', async (req: Request, res: Response) => {
  try {

    if (!req.body?.first_name || !req.body?.last_name || !req.body?.password || !req.body?.username) {

      const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);

      res.status(400).send(msg);

    } else {
      let { first_name, last_name, password, username } = req.body;

      const result = await UserService.saveUser({ first_name, last_name, password, username })

      res.status(result.statusCode).send(result);
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
});

userRouter.patch('/', auth, async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    if (!req.body.username || req.body.id || req.body.account_updated || req.body.account_created) {
      
      const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
      
      res.status(msg.statusCode).send(msg);
    } else {
      
      let obj = {
        username: req.body.username
      };
      
      if (req.body.first_name) obj['first_name'] = req.body.first_name;
      if (req.body.last_name) obj['last_name'] = req.body.last_name;
      if (req.body.password) obj['password'] = req.body.password;

      const result = await UserService.updateUser(obj);

      res.status(result.statusCode).send(result);

    }
  }
  catch (e) {
    res.status(500).send(e);
  }
});

