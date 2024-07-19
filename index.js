import express from 'express'
import sequelize from './database/dbConnection.js'
import userRouter from './src/modules/users/user.routes.js'
import bookRouter from './src/modules/books/book.routes.js'
import borrowRouter from './src/modules/borrowing/borrow.routes.js'
const app = express()
const port = 3000

app.use(express.json())
sequelize.sync({ alter: false ,force:false})

app.use('/users',userRouter)
app.use('/books',bookRouter)
app.use('/borrow',borrowRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))