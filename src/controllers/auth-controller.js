import { UserService } from "../services/index.js";
import { createError } from "../utils/error.js";

const userService = new UserService();

export const signUp = async (req, res, next) => {
  try {
    const newUser = await userService.signUp({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: newUser,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await userService.signIn(req.body);
    res
      .cookie("access_token", user.token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User successfully logged in",
        data: user,
        err: {},
      });
  } catch (error) {
    console.error(error);
    next(createError(error, 400));
  }
};

export const googleAuth = async (req, res) => {
  try {
    const user = await userService.googleAuth(req.body);

    res
      .cookie("access_token", user.token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User successfully logged in",
        data: user,
        err: {},
      });
  } catch (error) {
    console.error(error);
    next(createError(error, 400));
  }
};
