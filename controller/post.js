const mongoose = require("mongoose");
const Post = require("../models/post");
const User = require("../models/user");
mongoose.set('useFindAndModify', false);




exports.createPost = (req, res) => {

    const postObj = {
        title: req.body.title,
        postedBy: req.user
    }

    if (req.body.content) {
        postObj.content = req.body.content;
    }

    if (req.file) {
        postObj.file = process.env.API + '/public/' + req.file.filename;
    }

    req.user.password = undefined;
    req.user.email = undefined;

    if (!req.body.title) {
        return res.status(422).json({ error: 'Title of the post is requred' })
    }

    const _post = new Post(postObj);

    _post.save((error, post) => {

        if (error) return res.status(400).json({ error });

        if (post) {
            res.status(200).json({
                post,
                file: req.file
            });
        }
    });
}


exports.getAllPosts = (req, res) => {
    Post.find().sort({ "_id": -1 })
        .populate("postedBy", "_id firstName lastName")
        .populate("comments.postedBy", "_id firstName lastName")
        .then(posts => {
            res.json({ posts: posts });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.comment = (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    
    let commentById = req.body.commentBy;
    let postCommenttedOn = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (commentById != comment.postedBy) {
        Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                comments: comment
            }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id firstName lastName")
            .populate("postedBy", "_id firstName lastName")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
                User.findByIdAndUpdate(commentById, {
                    $push: { 
                        notifications: [{
                            firstName: firstName,
                            lastName: lastName,
                            text: "Comment on your post title: " + postCommenttedOn
                        }] 
                    }
                }, { new: true }).then(result => {
                    res.json(result)
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
            });
    }else{
        Post.findByIdAndUpdate(req.body.postId, { 
            $push: { 
                comments: comment
            }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id firstName lastName")
            .populate("postedBy", "_id firstName lastName")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }else{
                    res.json(result)
                }
            });
    }
}


exports.like = (req, res) => {
    const postLikeOn = req.body.title;
    const likedById = req.body.likedBy;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const postedBy = req.user._id;

    if (likedById != postedBy){
        Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                likes: req.user._id
            }
        }, {
            new: true
        })
            .populate("likes.postedBy", "_id")
            .populate("postedBy", "_id")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                }
                User.findByIdAndUpdate(likedById, {
                    $push: {
                        notifications: [{
                            firstName: firstName,
                            lastName: lastName,
                            text: "Like your post title: " + postLikeOn
                        }] 
                    }
                }, { new: true }).then(result => {
                    res.json(result)
                }).catch(err => {
                    return res.status(422).json({ error: err })
                })
            });
    }else{
        Post.findByIdAndUpdate(req.body.postId, {
            $push: {
                likes: req.user._id
            }
        }, {
            new: true
        })
            .populate("likes.postedBy", "_id")
            .populate("postedBy", "_id")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    res.json(result)
                }
            });
    }
}


exports.unlike = (req, res) => {

    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {
            likes: req.user._id
        }
    }, {
        new: true
    })
        .populate("unlikes.postedBy", "_id")
        .populate("postedBy", "_id")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        });
    
}

exports.deletePost = (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        });
}
