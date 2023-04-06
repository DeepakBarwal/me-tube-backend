import mongoose from "mongoose";

import { MONGO_URI } from "./serverConfig.js";

export const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
