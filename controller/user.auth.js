const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateRandomNumber = (min,max) => { //generating 3 digit number to be added to firstName and lastName as username
    return Math.floor(Math.random() * (max - min) + min);
}

exports.signup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    User.findOne({ email: email })
    .exec(async (error, user) => {
        if(error || user) return res.status(400).json({
            message: 'User already exist'
        });
        const hash_password = await bcrypt.hash(password, 12); //Here, I'm hashing user password and sort it 12 times
        const _user = new User({
            firstName,
            lastName,
            username: firstName + lastName + generateRandomNumber(100,200), //generating username
            email,
            hash_password,
            role: 'user'
        });
        
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong...'
                });
            }

            if(data){
                return res.status(201).json({
                    message: 'User successfully created...'
                });
            }
        });
    });
}

exports.signin = (req, res) => {
    const { username, password } = req.body;
    User.findOne({username: username})
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });

        if(user){
            if(user.authenticate(password) && user.role === 'user'){ //Authenticating user password
                const token = jwt.sign({ _id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '3h'}); //generating user token
                const {_id, firstName, lastName, username, email, role, fullName, followers, following} = user;
                res.cookie('token', token, {expiresIn: '3h'});
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName, username, email, role, fullName, followers, following
                    }
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid email and password'
                });
            }

        }else{
            return res.status(400).json({
               message: 'Something went wrong'
            });
        }
    });
}


exports.signout = (req, res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message: 'signout successfully...!'
    });
}