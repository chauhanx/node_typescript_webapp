import { respMsg } from './helper';
import { MESSAGES } from './constants';
import * as dotenv from 'dotenv';

dotenv.config();

export const auth = async(req,res,next) => {
    let authHeader = req.headers.authorization;
    // check if authorization token is present
     if(!authHeader){
            let result = await respMsg(401,MESSAGES.UNAUTHORIZED,[]);
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="bad token request"');
            res.json(result);

    }else{
        let auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
        let username = auth[0];
        let password = auth[1];
        // match if username and password are same
        if(username && password && process.env.BASIC_AUTH_USER == username && process.env.BASIC_AUTH_PASS == password){
            next();
        }else{
            let result = await respMsg(401,MESSAGES.UNAUTHORIZED,[]);
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="bad token request"');
            res.json(result);
        }
    }
}


