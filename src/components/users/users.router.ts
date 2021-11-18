import express, { Request, Response } from 'express';
import * as UserService from './users.service';
import { respMsg, getUserPassAuth, checkValidEmail } from '../../utils/helper';
import { MESSAGES } from '../../utils/constants';
import { auth } from '../../utils/auth';
import SDC from 'statsd-client';
const sdc = new SDC({host: 'localhost', port: 8125});
export const userRouter = express.Router();
import {logger} from '../../../config/winston'

userRouter.get('/',auth, async ( req: Request, res: Response,next) => {
  sdc.increment('user_get');
  let startTime = new Date().valueOf();
  try {
      logger.info('Get user details');
      let authHeader = req.headers.authorization;
      let {username} = await getUserPassAuth(authHeader);
      
      let obj = {
        username: username
      };
      
      const result = await UserService.getUser(obj);
      let endTime = new Date().valueOf();
      sdc.timing('user_get_timer', endTime-startTime);
      res.status(200).send(result);
  }
  catch (e) {
    logger.error('Error get user details');
    let endTime = new Date().valueOf();
    sdc.timing('user_get_timer', endTime-startTime);
    res.status(500).send(e);
  }
});

userRouter.post('/', async (req: Request, res: Response) => {
  // client.increment('my_counter');
  sdc.increment('user_add');
  let startTime = new Date().valueOf();
  try {
    logger.info('Add new user details');
    if (!req.body.first_name || !req.body.last_name || !req.body.password || !req.body.username || !checkValidEmail(req.body.username)) {

      const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
      let endTime = new Date().valueOf();
      sdc.timing('user_add_timer', endTime-startTime);
      res.status(400).send(msg);

    } else {
      
      let { first_name, last_name, password, username } = req.body;

      const result = await UserService.saveUser({ first_name, last_name, password, username })
      let endTime = new Date().valueOf();
      sdc.timing('user_add_timer', endTime-startTime);
      res.status(result.statusCode).send(result);
    }
  }
  catch (e) {
    logger.error('Error add new user details');
    let endTime = new Date().valueOf();
    sdc.timing('user_add_timer', endTime-startTime);
    res.status(500).send(e);
  }
});

userRouter.patch('/', auth, async (req: Request, res: Response) => {
  sdc.increment('user_update');
  let startTime = new Date().valueOf();
  try {
    logger.info('Update user details');
    if (req.body.id || req.body.account_updated || req.body.account_created) {
      
      const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
      let endTime = new Date().valueOf();  
      sdc.timing('user_update_timer', endTime-startTime);
      res.status(msg.statusCode).send(msg);
    } else {
      let authHeader = req.headers.authorization;
      let {username} = await getUserPassAuth(authHeader);

      let obj = {
        username: username,
        first_name:'',
        last_name:'',
        password:''
      };
      
      if (req.body.first_name) obj.first_name = req.body.first_name;
      if (req.body.last_name) obj.last_name = req.body.last_name;
      if (req.body.password) obj.password = req.body.password;
      // let resObj =  Object.entries(obj).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {});
      for (var prop in obj) {
        if (obj[prop] == '' || obj[prop] === null || obj[prop] === undefined) {
            delete obj[prop];
        }
    }
      const result = await UserService.updateUser(obj);
      let endTime = new Date().valueOf();
      sdc.timing('user_update_timer', endTime-startTime);
      res.status(result.statusCode).send(result);
    }
  }
  catch (e) {
    logger.info('Error Updating user details');
    let endTime = new Date().valueOf();
    sdc.timing('user_update_timer', endTime-startTime);
    res.status(500).send(e);
  }
});

