const {check, validationResult} = require('express-validator');


exports.validateSignupRequest = [
   check('firstName')
   .notEmpty()
   .withMessage('firstName is required'),
   check('lastName')
   .notEmpty()
   .withMessage('lastName is required'),
   check('email')
   .isEmail()
   .withMessage('Valid Email is required'),
   check('password')
   .isLength({ min: 8 })
   .withMessage('Password must be at least 8 character long'),
];


exports.validateSigninRequest = [
    check('username')
    .notEmpty()
    .withMessage('Valid Username is required'),
    check('password')
    .notEmpty()
    .withMessage('Your Password Cannot Be Empty')
 ];
 
 exports.isRequestValidated = (req, res, next) => {
     const errors = validationResult(req);
 
     if(errors.array().length > 0){
         return res.status(400).json({ error: errors.array()[0].msg })
     }
     next();
 }