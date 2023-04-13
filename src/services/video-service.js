import { VideoRepository } from "../repositories/index.js";
import { createError } from "../utils/error.js";

class VideoService {
  constructor() {
    this.videoRepository = new VideoRepository();
  }

  async updateVideo(userId, videoId, data) {
    try {
      const video = await this.videoRepository.get(videoId);
      if (!video) {
        return next(createError(new Error("Video not found"), 404));
      }
      if (userId === video.userId.toString()) {
        const updatedVideo = await this.videoRepository.update(videoId, data);
        return updatedVideo;
      } else {
        return next(
          createError(new Error("You can only update your own videos"), 403)
        );
      }
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }

  async deleteVideo(userId, videoId) {
    try {
      const video = await this.videoRepository.get(videoId);
      if (!video) {
        throw createError(new Error("Video not found"), 404);
      }
      if (userId === video.userId.toString()) {
        const deletedVideo = await this.videoRepository.destroy(videoId);
        return deletedVideo;
      } else {
        throw createError(
          new Error("You can only delete your own videos"),
          403
        );
      }
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }

  async getRandomVideos() {
    try {
      const randomVideos = await this.videoRepository.getRandomVideos();
      return randomVideos;
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }

  async getTrendingVideos() {
    try {
      const trendingVideos = await this.videoRepository.getTrendingVideos();
      return trendingVideos;
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }

  async getSubscriptionVideos(userId) {
    try {
      const subscriptionVideos =
        await this.videoRepository.getSubscriptionVideos(userId);
      return subscriptionVideos;
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }

  async getByTag(tags) {
    try {
      const videos = await this.videoRepository.getByTag(tags);
      return videos;
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }
}

export default VideoService;
