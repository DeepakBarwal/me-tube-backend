import Video from "../models/video.js";
import CrudRepository from "./crud-repository.js";

class VideoRepository extends CrudRepository {
  constructor() {
    super(Video);
  }

  async getRandomVideos() {
    try {
      const randomVideos = await Video.aggregate([{ $sample: { size: 40 } }]);
      return randomVideos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTrendingVideos() {
    try {
      const randomVideos = await Video.find({}).sort({ views: -1 });
      return randomVideos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default VideoRepository;
