import { Sequelize } from "sequelize";



const sequelize = new Sequelize('mysql://uug9lsaiedc78puo:zjjVZbOuWo9lOK4zKyYo@bzrczsj7gmx4cirexknc-mysql.services.clever-cloud.com:3306/bzrczsj7gmx4cirexknc')


try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default sequelize