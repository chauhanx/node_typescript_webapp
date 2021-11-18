import { IImage } from './image.model';
import Image from './image.model';
import User from '../users/users.model';
import { generateId, ecryptPass, respMsg, upload_s3 , delete_s3} from '../../utils/helper';
import { MESSAGES } from '../../utils/constants';
import StatsD from 'node-statsd';
var sdc = new StatsD();
// to fetch user details based on username
export const getUserImage  = async(data) => {
    
    try{
        sdc.increment('image_get');
        let startTime = new Date().valueOf();
        let search = {
            where:{
                username:data.username
            }
        }

        let user = await User.findOne(search);
        let endTime = new Date().valueOf();
        sdc.timing('db_image_find_timer', endTime-startTime);
        // to check if user exist with provided username
        if(user){
            let search = {
                where:{
                    user_id : user.id
                }
            }
            const image = await Image.findOne(search);
            let endTime = new Date().valueOf();
            sdc.timing('db_image_find_timer', endTime-startTime);
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
        sdc.increment('image_delete');
        let startTime = new Date().valueOf();
        let search = {
            where:{
                username:data.username
            }
        }
        const user = await User.findOne(search);
        let endTime = new Date().valueOf();
        sdc.timing('db_user_find_timer', endTime-startTime);
        // to check if user exits then update user details
        if(user){
            let imageSearch  = {
                where : {
                    user_id : user.id
                }
            }

            const image = await Image.findOne(imageSearch);
            let endTime = new Date().valueOf();
            sdc.timing('db_image_find_timer', endTime-startTime);
            if(image){
                if(image.metaData.Key){
                    const s3Delete = await delete_s3(image.metaData.Key);
                    let endTime = new Date().valueOf();
                    sdc.timing('s3_image_delete_timer', endTime-startTime);
                    if(s3Delete){
                        let search = {
                            where:{
                                id:image.id
                            }
                        }

                        const result = await Image.destroy(search);
                        endTime = new Date().valueOf();
                        sdc.timing('db_image_delete_timer', endTime-startTime);
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
        sdc.increment('image_upload');
        let startTime = new Date().valueOf();
        let search = {
            where:{
                username:data.username
            }
        }
        const user = await User.findOne(search);
        let endTime = new Date().valueOf();
        sdc.timing('db_user_find_timer', endTime-startTime);
        // to check if user exits then update user details
        if(user){
            
            const s3Data = await upload_s3(data.file);
            let endTime = new Date().valueOf();
            sdc.timing('s3_image_upload_timer', endTime-startTime);
            console.log("after upload");
            console.log(s3Data);
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
                let endTime = new Date().valueOf();
                sdc.timing('db_image_delete_timer', endTime-startTime);
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
        sdc.increment('image_update');
        let startTime = new Date().valueOf();
        let search = {
            where:{
                username:data.username
            }
        }
        const user = await User.findOne(search);
        let endTime = new Date().valueOf();
        sdc.timing('db_image_update_timer', endTime-startTime);
        // to check if user exits then update user details
        if(user){
            let imageSearch  = {
                where : {
                    user_id : user.id
                }
            }

            const image = await Image.findOne(imageSearch);
            let endTime = new Date().valueOf();
            sdc.timing('db_image_find_timer', endTime-startTime);
            if(image){
                if(image.metaData.Key){
                    await delete_s3(image.metaData.Key);
                    let endTime = new Date().valueOf();
                    sdc.timing('s3_image_delete_timer', endTime-startTime);
                }

                const s3Data = await upload_s3(data.file);
                let endTime = new Date().valueOf();
                sdc.timing('s3_image_upload_timer', endTime-startTime);
                let fileExt = data.file.mime.split("/")[1]; 
                if(s3Data){
                    
                    image.file_name = `${s3Data.Key}.${fileExt}`,
                    image.url = s3Data.Location,
                    image.metaData = {
                        ETag:s3Data.ETag,
                        Key:s3Data.Key
                    }
                    
                    const result = await image.save();
                    let endTime = new Date().valueOf();
                    sdc.timing('db_image_create_timer', endTime-startTime);
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
