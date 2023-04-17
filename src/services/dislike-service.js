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
        var dislikeable = await this.videoRepository.get(modelId);
      } else {
        throw new Error("unknown model type");
      }
      const exists = await this.dislikeRepository.findByUserAndDisLikable({
        $and: [
          {
            userId: userId,
          },
          {
            onModel: modelType,
          },
          {
            dislikable: modelId,
          },
        ],
      });
      if (exists) {
        dislikeable.likes.pull(exists.id);
        await dislikeable.save();
        await exists.deleteOne();
        var isAdded = false;
      } else {
        var newDislike = await this.dislikeRepository.create({
          userId: userId,
          onModel: modelType,
          dislikeable: modelId,
        });
        const liked = await this.likeRepository.getByLikeable({
          $and: [
            {
              likeable: modelId,
            },
            {
              userId: userId,
            },
          ],
        });
        if (liked) {
          await dislikeable.likes.pull(liked.id);
          await liked.deleteOne();
        }
        dislikeable.dislikes.push(newDislike);
        await dislikeable.save();
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
