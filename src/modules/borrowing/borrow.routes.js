import { Router } from "express";
import { getAllBorrows,borrowBook,returnBook,getAllBorrowedBook } from "./borrow.controller.js";



const borrowRouter = Router()


borrowRouter.get('/getAllBorrows',getAllBorrows)
borrowRouter.get('/getAllBorrowedBook',getAllBorrowedBook)
borrowRouter.post('/borrowBook',borrowBook)
borrowRouter.post('/returnBook',returnBook)




export default borrowRouter