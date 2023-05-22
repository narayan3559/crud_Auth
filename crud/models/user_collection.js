//
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const user_schema = new mongoose.Schema(
  {
    username: {
      unique: true,
      type: String,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      required: true,
      type: String,
    },
    name: {
      type: String,
    },
    otp: {
      type: String,
    },
    otp_expiration: {
      type: Date,
    },
    auth_token: String,
    reset_token: String,
    reset_token_expiration: Date,
    permit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//

user_schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const user_model = mongoose.model('user_collection', user_schema)

module.exports = user_model
