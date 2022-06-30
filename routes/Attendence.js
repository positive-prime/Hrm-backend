const express=require('express');
const Attendence=require('../Controller/AttendenceController')
const router = express.Router();
router.get('/',()=>{
    console.log("success");
})

module.exports = router;