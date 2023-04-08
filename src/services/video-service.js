import { VideoRepository } from "../repositories/index.js";
import { createError } from "../utils/error.js";

class VideoService {
  constructor() {
    this.videoRepository = new VideoRepository();
  }
}

export default VideoService;
