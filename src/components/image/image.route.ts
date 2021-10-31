import express, { Request, Response } from 'express';
import * as ImageService from './image.service';
import { respMsg, getUserPassAuth } from '../../utils/helper';
import { MESSAGES } from '../../utils/constants';
import { auth } from '../../utils/auth';

export const imageRouter = express.Router();

imageRouter.get('/',auth, async ( req: Request, res: Response,next) => {
  try {
    if (req.body.file_name || req.body.id || req.body.url || req.body.upload_date || req.body.user_id) {
      
        const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
        
        res.status(msg.statusCode).send(msg);
    }else{

      let authHeader = req.headers.authorization;
      let {username} = await getUserPassAuth(authHeader);
      
      let obj = {
        username: username
      };
      
      const result = await ImageService.getUserImage(obj);
      
      res.status(200).send(result);
    
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
});

imageRouter.post('/', async (req: Request, res: Response) => {
  try {

    if (req.body.file_name || req.body.id || req.body.url || req.body.upload_date || req.body.user_id) {
      
        const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
        
        res.status(msg.statusCode).send(msg);
    }else{
        let authHeader = req.headers.authorization;
      
        let {username} = await getUserPassAuth(authHeader);
    
        let obj = {
            username: username,
            file:req.body.image
        };
    
        const result = await ImageService.uploadUserImage(obj);
        // result['upload_date'] = getDateFormat(result['upload_date']);
        res.status(result.statusCode).send(result);
    } 
   

  }
  catch (e) {
    res.status(500).send(e);
  }
});

imageRouter.delete('/', auth, async (req: Request, res: Response) => {
  try {
    if (req.body.file_name || req.body.id || req.body.url || req.body.upload_date || req.body.user_id) {
      
        const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
        
        res.status(msg.statusCode).send(msg);
    }else{
        let authHeader = req.headers.authorization;
        let {username} = await getUserPassAuth(authHeader);

        let obj = {
            username: username
        };

        const result = await ImageService.deleteImage(obj);
        res.status(result.statusCode).send(result);
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
});

imageRouter.patch('/', auth, async (req: Request, res: Response) => {
    try {
        if (req.body.file_name || req.body.id || req.body.url || req.body.upload_date || req.body.user_id) {
      
            const msg = await respMsg(400, MESSAGES.BAD_REQUEST, []);
            
            res.status(msg.statusCode).send(msg);
        }else{
            let authHeader = req.headers.authorization;
            let {username} = await getUserPassAuth(authHeader);

            let obj = {
                username: username,
                file:req.body.image
            };
        
            const result = await ImageService.updateImage(obj);
            res.status(result.statusCode).send(result);
        }
    }
    catch (e) {
      res.status(500).send(e);
    }
  });


const getDateFormat = (date) => {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
