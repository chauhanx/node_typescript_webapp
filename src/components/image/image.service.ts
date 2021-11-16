import { IImage } from './image.model';
import Image from './image.model';
import User from '../users/users.model';
import { generateId, ecryptPass, respMsg, upload_s3 , delete_s3} from '../../utils/helper';
import { MESSAGES } from '../../utils/constants';

// to fetch user details based on username
export const getUserImage  = async(data) => {
    try{
        let search = {
            where:{
                username:data.username
            }
        }

        let user = await User.findOne(search);
        // to check if user exist with provided username
        if(user){
            let search = {
                where:{
                    user_id : user.id
                }
            }
            const image = await Image.findOne(search);
            console.log(image);
            if(image){
                // image['upload_date'] = getDateFormat(image['upload_date']);
                delete image.metaData;
                return respMsg(200,MESSAGES.SUCCESS,[image]);
            }else{
                return respMsg(200,MESSAGES.IMAGE_NOT_EXIST,[]);
            }
            
            // let userData = await formatUser(user['dataValues']);
            
        }else{
            return respMsg(200,MESSAGES.USER_NOT_EXIST,[]);
        }
        
    }catch(e){
        return await respMsg(500,'',[e]);
    }
 
}

// to update the user details based on username
export const deleteImage = async(data) =>{
    try{
        let search = {
            where:{
                username:data.username
            }
        }
        const user = await User.findOne(search);
        // to check if user exits then update user details
        if(user){
            let imageSearch  = {
                where : {
                    user_id : user.id
                }
            }

            const image = await Image.findOne(imageSearch);

            if(image){
                if(image.metaData.Key){
                    const s3Delete = await delete_s3(image.metaData.Key);
                    if(s3Delete){
                        let search = {
                            where:{
                                id:image.id
                            }
                        }

                        const result = await Image.destroy(search);
                        if(result){
                            return respMsg(200,MESSAGES.IMAGE_DELETE_SUCCESS,[]);
                        }else{
                            return respMsg(404,MESSAGES.IMAGE_NOT_EXIST,[]);
                        }
                    }

                }else{
                    return respMsg(404,MESSAGES.IMAGE_NOT_EXIST,[]);    
                }
            }else{
                return respMsg(404,MESSAGES.IMAGE_NOT_EXIST,[]);
            }

        }else{
            return respMsg(401,MESSAGES.USER_NOT_EXIST,[]);
        }
        
    }catch(e){
        return await respMsg(500,'',[e]);
    }
}

// to upload the user image
export const uploadUserImage = async(data) =>{
    try{

        let search = {
            where:{
                username:data.username
            }
        }
        const user = await User.findOne(search);
        // to check if user exits then update user details
        if(user){

            const s3Data = await upload_s3(data.file);
            // let fileExt = data.file.mime.split("/")[1]; 
            if(s3Data){
                
                let obj = {
                    file_name:`${s3Data.Key}`,
                    id:generateId(),
                    url:s3Data.Location,
                    user_id:user['dataValues'].id,
                    metaData:{
                        ETag:s3Data.ETag,
                        Key:s3Data.Key
                    }
                }
                
                const image = new Image(obj);
                const result = await image.save();
                delete result.metaData;
                return respMsg(201,MESSAGES.IMAGE_ADDED_SUCCESS,[result['dataValues']]);

            }else{
                return respMsg(400,MESSAGES.BAD_REQUEST,[]);
            }

        }else{
            return respMsg(401,MESSAGES.USER_NOT_EXIST,[]);
        }
        
    }catch(e){
        return await respMsg(500,'',[e]);
    }
}



export const updateImage = async(data) =>{
    try{
        let search = {
            where:{
                username:data.username
            }
        }
        const user = await User.findOne(search);
        // to check if user exits then update user details
        if(user){
            let imageSearch  = {
                where : {
                    user_id : user.id
                }
            }

            const image = await Image.findOne(imageSearch);

            if(image){
                if(image.metaData.Key){
                    await delete_s3(image.metaData.Key);
                }

                const s3Data = await upload_s3(data.file);
                let fileExt = data.file.mime.split("/")[1]; 
                if(s3Data){
                    
                    image.file_name = `${s3Data.Key}.${fileExt}`,
                    image.url = s3Data.Location,
                    image.metaData = {
                        ETag:s3Data.ETag,
                        Key:s3Data.Key
                    }
                    
                    const result = await image.save();
                    return respMsg(201,MESSAGES.IMAGE_ADDED_SUCCESS,[result]);
                }
                
            }else{
                return respMsg(404,MESSAGES.IMAGE_NOT_EXIST,[]);
            }

        }else{
            return respMsg(401,MESSAGES.USER_NOT_EXIST,[]);
        }
        
    }catch(e){
        return await respMsg(500,'',[e]);
    }
}


const getDateFormat = (date) => {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
