const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeesController = require('../controllers/employee-controller');

router.get('/signin', employeesController.login);
router.get('/signup', employeesController.signup);

router.post('/signup/create', employeesController.createEmployee);
router.post('/login/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/employee/signin'}
), employeesController.createSession);

router.get('/signout', employeesController.destroySession);

router.use('/dashboard', require('./dashborad'));

module.exports = router;