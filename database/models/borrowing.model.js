import sequelize from '../dbConnection.js'
import { DataTypes } from 'sequelize'
import userModel from './user.model.js'
import bookModel from './book.model.js'


export const borrowModel = sequelize.define('borrow', {

    returnDate: {
        type: DataTypes.DATE
    }
    ,
}, { timestamps: true, updatedAt: false })

userModel.hasMany(borrowModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
borrowModel.belongsTo(userModel)

bookModel.hasMany(borrowModel, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
borrowModel.belongsTo(bookModel)


export default borrowModel

