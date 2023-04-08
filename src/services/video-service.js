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
      }
    } catch (error) {
      console.error("Something went wrong at video service layer: " + error);
      throw error;
    }
  }
}

export default VideoService;
