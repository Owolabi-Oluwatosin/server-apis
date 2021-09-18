const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
mongoose.set('useFindAndModify', false);

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);


exports.messaging = (req, res) => {
    // const message = new message(req.body);


    // res.status(200).json({
    //     message: "messaging controller"
    // })
}

// io.on("connection", () => {
//     console.log("User is connected")
// });