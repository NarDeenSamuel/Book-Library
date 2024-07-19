import { Router } from "express";
import { getUsers,register,login } from "./user.controller.js";
import { checkUser } from "../../../middleware/checkUser.js";




const userRouter = Router()

userRouter.get('/getUsers',getUsers)
userRouter.post('/register',checkUser,register)
userRouter.post('/login',login)




export default userRouter