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
      const exists = await this.likeRepository.findByUserAndLikable({
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
      if (exists) {
        likeable.likes.pull(exists.id);
        await likeable.save();
        await exists.deleteOne();
        var isAdded = false;
      } else {
        var newLike = await this.likeRepository.create({
          userId: userId,
          onModel: modelType,
          likeable: modelId,
        });
        const disliked = await this.dislikeRepository.getByDislikeable({
          $and: [
            {
              dislikeable: modelId,
            },
            {
              userId: userId,
            },
          ],
        });
        console.log("disliked", disliked);
        if (disliked) {
          await likeable.dislikes.pull(disliked.id);
          await disliked.deleteOne();
        }
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
