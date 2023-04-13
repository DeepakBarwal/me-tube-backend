import Video from "../models/video.js";
import CrudRepository from "./crud-repository.js";
import User from "../models/user.js";

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

  async getSubscriptionVideos(userId) {
    try {
      const user = await User.findById(userId);
      const list = await Promise.all(
        user.subscribedToUsers.map((channelId) => {
          return Video.find({ userId: channelId });
        })
      );
      return list.flat().sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByTag(tags) {
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      return videos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchByQuery(searchQuery) {
    try {
      const videos = await Video.find({
        title: { $regex: searchQuery, $options: "i" },
      }).limit(40);
      return videos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default VideoRepository;
