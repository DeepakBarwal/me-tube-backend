import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRY } from "../config/serverConfig.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscribedToUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const user = this;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      const SALT = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(this.password, SALT);
      user.password = encryptedPassword;
    }
    next();
  } catch (error) {
    console.error("Error while saving user in DB: " + error);
    throw error;
  }
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function genJWT() {
  return jwt.sign({ id: this._id, name: this.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
