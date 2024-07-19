import sequelize from "../dbConnection.js";
import { DataTypes } from "sequelize";

const bookModel = sequelize.define('book', {
    name: {
        type: DataTypes.STRING(100),
    },
    auther: {
        type: DataTypes.STRING(100)
    },
    status:{
        type:DataTypes.STRING(50),
        defaultValue: "available"
    }
},{ timestamps: true, updatedAt: true });




export default bookModel