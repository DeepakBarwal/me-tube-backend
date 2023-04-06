import { UserService } from "../services/index.js";
import { createError } from "../utils/error.js";

const userService = new UserService();

export const update = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.user.id,
      req.body
    );
    // if (updatedUser.data.status) throw updatedUser;
    return res.status(200).json({
      success: true,
      message: "Successfully updated the user",
      data: updatedUser,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const destroy = (req, res, next) => {};

export const getUser = (req, res, next) => {};

export const subscribe = (req, res, next) => {};

export const unsubscribe = (req, res, next) => {};

export const like = (req, res, next) => {};

export const dislike = (req, res, next) => {};
