const express = require("express");
const multer = require('multer');
const path = require('path');
const { 
    follow, 
    unfollow, 
    userSearch,
    updateLoginUser
} = require("../controller/user");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../common-middleware/index");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });


router.put('/follow', requireSignin, userMiddleware, follow);
router.put('/unfollow', requireSignin, userMiddleware, unfollow);
router.post('/search', requireSignin, userMiddleware, userSearch);
router.put('/updateuser', updateLoginUser);

module.exports = router;