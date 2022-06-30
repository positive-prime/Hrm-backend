const express=require('express');
const dotenv=require('dotenv');
const db=require('./config/Connection');
const attendence=require('./routes/Attendence');
const app=express();
app.use(express.json());
app.use('api/attendence',attendence);
app.listen(8000,()=>{
    console.log("server is running");
});