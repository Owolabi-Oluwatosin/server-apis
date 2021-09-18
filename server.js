const express = require("express");
const env = require('dotenv');
const path = require('path');
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require('cors');

const app = express();

//environment variable or you can say constants
env.config();

//routes
const userAuthRoutes = require('./routes/user.auth');
const messageRoutes = require('./routes/message');
const adminAuthRoutes = require('./routes/admin.auth');
const postRoutes = require("./routes/post");
const userRoutes = require('./routes/user');

//parsing request
app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use('/public', express.static(path.join(__dirname, 'uploads')));

//routes middleware
app.use('/api', userAuthRoutes);
app.use('/api', messageRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', postRoutes);
app.use('/api', userRoutes);

//connection to mongodb database
const db = 'mongodb://localhost:27017/SocialDB';
mongoose.connect(db, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log("Database Connected...");
}).catch((err) => {
  console.log(err);
});


// catch 404 and forward to error handler
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist"
  });
});


if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}

app.listen(process.env.PORT, function(){
  console.log(`Server started on port ${process.env.PORT}`);
});