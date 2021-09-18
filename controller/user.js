const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
mongoose.set('useFindAndModify', false);


exports.updateLoginUser = async (req, res) => {
    const {_id, firstName, lastName, email} = req.body;
    if(firstName !== "" || lastName !== "" || email !== ""){
        const userDataToUpadate = {
            firstName,
            lastName,
            email
        }
        const updatedUser = await User.findOneAndUpdate({_id: _id}, userDataToUpadate, {new: true});
        return res.status(201).json({
            updatedUser
        });
    }
}


exports.follow = (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    },
        {
            new: true
        }, (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            User.findByIdAndUpdate(req.user._id, {
                $push: { following: req.body.followId }
            }, { new: true }).select("-password").then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            })
        });
}


exports.unfollow = (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    },
        {
            new: true
        }, (err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            User.findByIdAndUpdate(req.user._id, {
                $pull: { following: req.body.unfollowId }
            }, { new: true }).select("-password").then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            });
        });
}

exports.userSearch = async (req, res) => {
    let userPattern = new RegExp(req.body.search);
    
    let userResult = await User.find(
        { 
            $or:[
                {email: 
                    { $regex: userPattern, "$options": "i" }
                }, 
                {firstName: 
                    { $regex: userPattern, "$options": "i" }
                }, 
                {lastName: 
                    { $regex: userPattern, "$options": "i" }
                } 
            ]
        }).select("_id firstName lastName userImage shortNote" )

    if(userResult){
        res.json({
            user: userResult
        })
    }else if(postResult){
        res.json({
            post: postResult
        })
    }
}