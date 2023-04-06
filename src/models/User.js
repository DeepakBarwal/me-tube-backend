import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", function (next) {
  try {
    const user = this;
    const SALT = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(this.password, SALT);
    user.password = encryptedPassword;
    next();
  } catch (error) {
    console.error("Error while saving user in DB: " + error);
    throw error;
  }
});

const User = mongoose.model("User", userSchema);

export default User;
