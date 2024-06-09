const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: [true, "Email must be unique."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  bio: { type: String },

  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dexcxd3xi/image/upload/v1700761470/stock-illustration-male-avatar-profile-picture-use_bxlg4g.jpg",
  },

  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
  requests: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "User",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
