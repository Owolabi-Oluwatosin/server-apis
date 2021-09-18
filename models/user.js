const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 20
  },
  username:{ 
    type: String, 
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  emailToken: {
    type: Boolean,
    default: false
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isAdminVerified: {
    type: Boolean,
    default: false
  },
  hash_password:{ 
    type: String, 
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user' 
  },
  followers: [{
    type: String
  }],
  following: [{
    type: String
  }],
  notifications: [{
    firstName:{
      type: String
    },
    lastName:{
      type: String
    },
    text:{
      type: String
    },
    notification_at: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true,
});

userSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password);
    }
}

module.exports = mongoose.model('User', userSchema);