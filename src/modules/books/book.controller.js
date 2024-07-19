import bookModel from "../../../database/models/book.model.js"
import userModel from "../../../database/models/user.model.js"

import jwt from 'jsonwebtoken'



const getAllBooks = async (req, res) => {

    let books = await bookModel.findAll()
    res.status(200).json({ message: "success", books })

}



const getBook = async (req, res) => {

    let book = await bookModel.findOne({
        where: {
            id: req.params.id
        }
    })
    if (book == null) {
        res.status(400).json({ message: "Book Not Found" })
    }
    else {
        res.status(200).json({ message: "success", book })
    }

}


const addBook = async (req, res) => {
    let { name, auther, status } = req.body

    let { token } = req.headers
    console.log(token)
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
        else {
            if (decoded.isAdmin == 0) {
                res.status(400).json({ message: "Can't Add Book" })
            }
            else {
                await bookModel.create({ name, auther, status })
                res.status(201).json({ message: "Added Successfully" })
            }
        }



    })



}


const updateBook = async (req, res) => {
    let { id, name, auther } = req.body

    let { token } = req.headers
    console.log(token)
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
        else {
            if (decoded.isAdmin == 0) {
                res.status(400).json({ message: "Can't Update Book" })
            }
            else {
                let book = await bookModel.findOne({ where: { id: id } })

                // console.log(book)

                if (book) {
                    await bookModel.update(
                        {
                            name: name, auther: auther
                        },

                        {
                            where: {
                                id: id,
                            },
                        },
                    )
                    res.status(200).json({ message: "Updated Successfully" })
                }
                else {
                    res.status(400).json({ message: "Book Not found" })
                }
            }
        }
    })
}



const deleteBook = async (req, res) => {


    let { id } = req.body
    let { token } = req.headers
    console.log(token)
    jwt.verify(token, 'secretkey', async (err, decoded) => {
        if (err) return res.status(401).json({ message: "token error", err })
        else {
            if (decoded.isAdmin == 0) {
                res.status(400).json({ message: "Can't Delete Book" })
            }
            else {
                let book = await bookModel.findOne({ where: { id: id } })

                // console.log(book)

                if (book) {
                    await bookModel.destroy(
                        {
                            where: {
                                id: id,
                            },
                        },
                    )
                    res.status(200).json({ message: "Deleted Successfully" })
                }
                else {
                    res.status(400).json({ message: "Book Not found" })
                }
            }
        }

    })

}



export {
    getAllBooks, getBook, addBook, updateBook, deleteBook
}