const express = require("express");
const router = express.Router();
const multer = require("multer");
const {requireSignin} = require("../common-middleware/index");
const path = require("path");
const { getAllPosts, createPost, userPosts, comment, like, unlike, deletePost } = require("../controller/post");



const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });


router.get(`/allpost`, requireSignin, getAllPosts);
router.post(`/createpost`, requireSignin, upload.single("file"), createPost);
router.put(`/comment`, requireSignin, comment);
router.put(`/like`, requireSignin, like);
router.put(`/unlike`, requireSignin, unlike);
router.delete(`/deletepost/:postId`, requireSignin, deletePost);


module.exports = router;