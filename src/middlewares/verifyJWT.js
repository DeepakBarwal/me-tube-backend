import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import { JWT_SECRET } from "../config/serverConfig.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    return next(createError(new Error("You are not authenticated"), 401));
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    throw createError(error, 403, "Token is not valid");
  }
};
