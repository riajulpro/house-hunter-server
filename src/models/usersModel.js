const { Schema, default: mongoose } = require("mongoose");

const users = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
});

const usersModel = mongoose.model("Users", users);

module.exports = usersModel;
