const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username:{
    type:String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model("User", UserSchema);