import sequelize from "../dbConnection.js";
import { DataTypes } from "sequelize";

const userModel = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type:DataTypes.STRING,
        defaultValue:false
    }
},{ timestamps: true, updatedAt: false });



export default userModel