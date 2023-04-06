import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8000;

export const MONGO_URI_LOCAL = process.env.MONGO_URI_LOCAL;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
