import bcrypt from 'bcrypt';
import userModel from '../database/models/user.model.js';
export const checkUser = async (req,res,next)=>{
   
    let user = await userModel.findAll({
        where: { userName: req.body.userName }
    })
        console.log(user);
    if(user.length != 0 )
       return res.status(409).json({message:"Already exist"})
    
        req.body.password =  bcrypt.hashSync(req.body.password,8)
        next()
    
} 