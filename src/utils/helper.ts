
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { RESPONSE } from './constants';


// to generate uuid for each user added
export const generateId = ()=>{
    return uuidv4();
};

// to encrypt password using salt
export const ecryptPass = async(pass)=>{
    let salt = 10;
    let result = await bcrypt.hash(pass,salt);
    return result;
};
// to match user's password
export const comparePass = async(pass,hash)=>{
    let result  = await bcrypt.compare(pass,hash);
    return result;
};

// to send response in format
export const respMsg = async(code=0,msg='',data) =>{
    let obj = JSON.parse(JSON.stringify(RESPONSE));
    if(code) obj.statusCode = code;
    if(msg) obj.message = msg;
    if(data) obj.data = data;
    return obj;
}

// to check validation of username(email)
export const checkValidEmail = (email) => {
  var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (filter.test(email)) return true;
  return false;
}

