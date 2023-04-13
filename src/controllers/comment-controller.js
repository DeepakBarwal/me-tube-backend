import { createError } from "../utils/error.js";
import { CommentService } from "../services/index.js";

const commentService = new CommentService();

export const addComment = async (req, res, next) => {
  try {
    const newComment = await commentService.create(
      req.query.modelId,
      req.query.modelType,
      req.user.id,
      req.body.content
    );
    return res.status(201).json({
      success: true,
      message: "Successfully created the comment",
      data: newComment,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await commentService.delete(
      req.params.id,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the comment",
      data: deletedComment,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const getComments = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};
