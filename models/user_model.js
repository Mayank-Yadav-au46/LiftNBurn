const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const user_schema = new Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
  },
  bio: {
    type: String,
  },
  height: {
    type: Number,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  goal: {
    type: String,
    require: true,
  },
  TW: {
    type: Number,
    require: true,
  },
  NOD: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  BMI: {
    type: Number,
  },
  BMR: {
    type: Number,
  },
  CTB: {
    type: Number,
  },
  CTE: {
    type: Number,
  },
  CI: [{ type: Number }],
});

const user_model = mongoose.model("users", user_schema);
module.exports = user_model;
