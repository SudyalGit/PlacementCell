const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.redirect('/employee/signin');
})

router.use('/employee', require('./employee'));

module.exports = router;