import { UserService, LikeService, DislikeService } from "../services/index.js";
import { createError } from "../utils/error.js";

const userService = new UserService();
const likeService = new LikeService();
const dislikeService = new DislikeService();

export const update = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.user.id,
      req.body
    );
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

export const destroy = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(
      req.params.id,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the user",
      data: deletedUser,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully found the user",
      data: user,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const subscribe = async (req, res, next) => {
  try {
    const user = await userService.subscribeToUser(req.params.id, req.user.id);
    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to the channel",
      data: user,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    const user = await userService.unsubscribeToUser(
      req.params.id,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully unsubscribed from the channel",
      data: user,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const like = async (req, res, next) => {
  try {
    const response = await likeService.toggleLike(
      req.query.modelId,
      req.query.modelType,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully toggled like",
      data: response,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const dislike = async (req, res, next) => {
  try {
    const response = await dislikeService.toggleDislike(
      req.query.modelId,
      req.query.modelType,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully toggled dislike",
      data: response,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};
