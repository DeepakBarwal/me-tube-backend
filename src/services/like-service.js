import {
  VideoRepository,
  LikeRepository,
  DislikeRepository,
} from "../repositories/index.js";

class LikeService {
  constructor() {
    this.videoRepository = new VideoRepository();
    this.likeRepository = new LikeRepository();
    this.dislikeRepository = new DislikeRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    try {
      if (modelType === "Video") {
        var likeable = await this.videoRepository.find(modelId);
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
      if (likeExists) {
        likeable.likes.pull(likeExists.id);
        await likeable.save();
        await likeExists.deleteOne();
        var isAdded = false;
      } else {
        if (dislikeExists) {
          likeable.dislikes.pull(dislikeExists.id);
          await likeable.save();
          await dislikeExists.deleteOne();
        }
        var newLike = await this.likeRepository.create({
          userId: userId,
          onModel: modelType,
          likeable: modelId,
        });
        likeable.likes.push(newLike);
        await likeable.save();
        var isAdded = true;
      }

      return isAdded;
    } catch (error) {
      console.error("Something went wrong at like service layer: " + error);
      throw error;
    }
  }

  async getAllUserIdsWhoLiked(id) {
    try {
      const { userId } = await this.likeRepository.get(id);
      return userId;
    } catch (error) {
      console.error("Something went wrong at like service layer: " + error);
      throw error;
    }
  }
}

export default LikeService;
