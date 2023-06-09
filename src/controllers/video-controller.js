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

export const addViews = async (req, res, next) => {
  try {
    const updatedVideo = await videoService.videoRepository.update(
      req.params.id,
      { $inc: { views: 1 } }
    );
    return res.status(200).json({
      success: true,
      message: "Successfully viewed the video",
      data: updatedVideo,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const random = async (req, res, next) => {
  try {
    const randomVideos = await videoService.getRandomVideos();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched random videos",
      data: randomVideos,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const trend = async (req, res, next) => {
  try {
    const trendingVideos = await videoService.getTrendingVideos();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched trending videos",
      data: trendingVideos,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const sub = async (req, res, next) => {
  try {
    const subscriptionVideos = await videoService.getSubscriptionVideos(
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Successfully fetched subscriptions videos",
      data: subscriptionVideos,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await videoService.getByTag(tags);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched videos by tags",
      data: videos,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await videoService.searchByQuery(query);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched videos by query",
      data: videos,
      err: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(error, error.status));
  }
};
