import { UserService } from "../services/index.js";
import { createError } from "../utils/error.js";

const userService = new UserService();

export const update = (req, res, next) => {
  try {
    res.send("lol");
  } catch (error) {
    console.error(error);
  }
};

export const destroy = (req, res, next) => {};

export const getUser = (req, res, next) => {};

export const subscribe = (req, res, next) => {};

export const unsubscribe = (req, res, next) => {};

export const like = (req, res, next) => {};

export const dislike = (req, res, next) => {};
