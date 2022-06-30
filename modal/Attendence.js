const Sequelize=require('sequelize');
const db=require('../config/Connection');
const Attendence=db.define('hrm',{
    ID:{
        type:DataTypes.INTEGER
    },
    employeeId:{
        type:DataTypes.STRING
    }, 
    shift:{
        type:DataTypes.STRING
    },
    Time_in:{
        type:DataTypes.TIME
    },
    Time_out:{
        type:DataTypes.TIME
    }
});
module.exports=Attendence;