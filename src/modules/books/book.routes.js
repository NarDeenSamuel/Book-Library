import { Router } from "express";
import {getAllBooks,getBook,addBook,updateBook,deleteBook } from "./book.controller.js";




const bookRouter = Router()



bookRouter.get('/getAllBooks',getAllBooks)
bookRouter.get('/getBook/:id',getBook)
bookRouter.post('/addBook',addBook)
bookRouter.put('/updateBook',updateBook)
bookRouter.delete('/deleteBook',deleteBook)

export default bookRouter