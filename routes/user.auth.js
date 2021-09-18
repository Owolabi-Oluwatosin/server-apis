const express = require('express');
const { signup, signin, signout} = require('../controller/user.auth');
const { 
    validateSignupRequest, 
    isRequestValidated, 
    validateSigninRequest 
} = require('../validators/auth');
const router = express.Router();


router.post('/user/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/user/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/user/signout', signout);

module.exports = router;