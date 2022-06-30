const {Sequelize}=require('sequelize');
const sequelize=new Sequelize('hrm','root','',{
    host:'localhost',
    dialect:'mysql'
})
try{
    sequelize.authenticate();
    console.log("connection is established");
}
catch(err){
  console.log("connection is not established");
}

module.exports=sequelize;