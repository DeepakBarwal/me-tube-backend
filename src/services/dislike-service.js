import {
  VideoRepository,
  DislikeRepository,
  LikeRepository,
} from "../repositories/index.js";

class DislikeService {
  constructor() {
    this.videoRepository = new VideoRepository();
    this.dislikeRepository = new DislikeRepository();
    this.likeRepository = new LikeRepository();
  }

  async toggleDislike(modelId, modelType, userId) {
    try {
      if (modelType === "Video") {
        var likeable = await this.videoRepository.get(modelId);
      } else {
        throw new Error("unknown model type");
      }
      const likeExists = await this.likeRepository.findByUserAndLikable({
        $and: [
          {
            userId: userId,
          },
          {
            onModel: modelType,
          },
          {
            likeable: modelId,
          },
        ],
      });
      const dislikeExists = await this.dislikeRepository.getByDislikeable({
        $and: [
          {
            userId: userId,
          },
          {
            onModel: modelType,
          },
          {
            dislikeable: modelId,
          },
        ],
      });
      if (dislikeExists) {
        likeable.dislikes.pull(dislikeExists.id);
        await likeable.save();
        await dislikeExists.deleteOne();
        var isAdded = false;
      } else {
        if (likeExists) {
          likeable.likes.pull(likeExists.id);
          await likeable.save();
          await likeExists.deleteOne();
        }
        var newDislike = await this.dislikeRepository.create({
          userId: userId,
          onModel: modelType,
          dislikeable: modelId,
        });
        likeable.dislikes.push(newDislike);
        await likeable.save();
        var isAdded = true;
      }
      return isAdded;
    } catch (error) {
      console.error("Something went wrong at dislike service layer: " + error);
      throw error;
    }
  }

  async getAllUserIdsWhoDisliked(id) {
    try {
      const { userId } = await this.dislikeRepository.get(id);
      return userId;
    } catch (error) {
      console.error("Something went wrong at dislike service layer: " + error);
      throw error;
    }
  }
}

export default DislikeService;
