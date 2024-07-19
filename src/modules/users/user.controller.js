import userModel from "../../../database/models/user.model.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const getUsers = async (req,res)=>{
    let users = await userModel.findAll()
    res.status(200).json({message:"success",users})
}


const register = async (req,res)=>{
    let { userName, password,isAdmin } = req.body
    let addUser = await userModel.create({userName,password,isAdmin})
       addUser.password=undefined
        res.status(201).json({ message: "success",addUser})
    
}


const login = async (req,res)=>{
    let { userName, password } = req.body
    let user = await userModel.findOne({ where: { userName } })
    if (user && bcrypt.compare(password, user.password)) {
       let isAdmin = user.isAdmin;
            let token = jwt.sign({ userName, isAdmin},'secretkey')
            res.status(200).json({message:"login successfully", token })
        
    }
    else {
        res.status(404).json({ message:" Invalid user name or password"})
    }





}

export {getUsers,register,login}