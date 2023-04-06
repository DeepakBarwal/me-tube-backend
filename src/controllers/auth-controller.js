import { UserService } from "../services/index.js";

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

export const signIn = (req, res) => {};

export const googleAuth = (req, res) => {};
