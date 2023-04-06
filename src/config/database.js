import mongoose from "mongoose";

import { MONGO_URI_LOCAL } from "./serverConfig.js";

export const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI_LOCAL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
