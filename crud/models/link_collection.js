const mongoose = require("mongoose");
const resetlink_schema = new mongoose.Schema(
  {
    resetlink_token: {
      type: String,
    },
    permit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const resetlink_model = mongoose.model("resetlink_collection", resetlink_schema);

module.exports = resetlink_model;
