const e = require('connect-flash');
const Employee = require('../models/employee');

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/employee/dashboard');
    }
    return res.render('login');
}

module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/employee/dashboard');
    }
    return res.render('signup');
}

module.exports.createEmployee = async function(req, res){
    // console.log(req.body);
    const emp = await Employee.findOne({email: req.body.email});
    // If employee already exist, redirect back
    if(emp){
        req.flash('error', 'User already exist!');
        console.log('User is already registered!');
        return res.redirect('back');
    }

    const employee =await Employee.create(req.body);
    console.log(employee);
    if(!employee){
        console.log(`Error occured in creating an employee: ${err}`);
        return res.redirect('back');
    }
    req.flash('success', 'Account created successfully, Login to continue.')
    return res.redirect('/employee/login');
}

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully!');
    return res.redirect('/employee/dashboard');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log(`Error in logging out: ${err}`);
            return res.redirect('back');
        }
    });
    req.flash('success', 'You Logged Out!');
    res.redirect('/employee/signin');
}