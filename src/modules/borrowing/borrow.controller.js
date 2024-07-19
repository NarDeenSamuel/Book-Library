import bookModel from "../../../database/models/book.model.js"
import borrowModel from "../../../database/models/borrowing.model.js"
import userModel from "../../../database/models/user.model.js"

import jwt from 'jsonwebtoken'

const getAllBorrows = async (req,res)=>{
    let borrows = await borrowModel.findAll({
        include: [
            {
                model: userModel,
                attributes: ['userName']
            },
            {
                model: bookModel,
                attributes: ['name']
            }
        ]
    })
    res.status(200).json({ message: "success", borrows })

}
const getAllBorrowedBook = async (req,res)=>{
    let borrows = await bookModel.findAll({where:{status:"borrowed"}},)
    res.status(200).json({ message: "success", borrows })
}


const borrowBook = async (req,res)=>{
   
   

    let { id } = req.body
    let { token } = req.headers
    console.log(token)
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
        else {
            if (decoded.isAdmin == 0) {
                res.status(400).json({ message: "Can't Do This Operation" })
            }
            else {
             
                
    let { userId,bookId,returnDate} = req.body
    

    let user = await userModel.findOne({ where: { id: userId } });
    console.log(user)
    if(user)
    {
        let book = await bookModel.findOne({where:{id:bookId,status:"available"}})
        if (book) {
            await borrowModel.create({ UserId:userId, bookId, returnDate: new Date(returnDate) });
            await bookModel.update({ status: "Borrowed" }, { where: { id: bookId } });
            return res.status(201).json({ message: "Borrowed" });
        } else {
            return res.status(400).json({ message: "Not Found" });
        }

    }
    else
    {
        res.status(400).json({ message: "Not Found"})
    }



            }
        }

    })

   
  



}



const returnBook = async (req,res)=>{

    let { name, auther, status } = req.body

    let { token } = req.headers
    console.log(token)
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
        else {
            if (decoded.isAdmin == 0) {
                res.status(400).json({ message: "Can't Do This Operation" })
            }
            else {
                

                let {bookId} = req.body
                let book = await bookModel.findOne({where:{id:bookId}})
                if (book) {
                    await bookModel.update({ status: "available" }, { where: { id: bookId } });
                    return res.status(201).json({ message: "Returned" });
                } else {
                    return res.status(400).json({ message: "Not Found" });
                }
            

            }
        }



    })










}

export {
    getAllBorrows,borrowBook,returnBook,getAllBorrowedBook
}