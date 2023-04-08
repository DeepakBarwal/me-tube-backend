import { VideoService } from "../services/index.js";
import { createError } from "../utils/error.js";

const videoService = new VideoService();

export const addVideo = async (req, res, next) => {
  try {
    const video = await videoService.videoRepository.create({
      userId: req.user.id,
      ...req.body,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created the video",
      data: video,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const updatedVideo = await videoService.updateVideo(
      req.user.id,
      req.params.id,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "Successfully updated the video",
      data: updatedVideo,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const deletedVideo = await videoService.deleteVideo(
      req.user.id,
      req.params.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the video",
      data: deletedVideo,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await videoService.videoRepository.get(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the video",
      data: video,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};
