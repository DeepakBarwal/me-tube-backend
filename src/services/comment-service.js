import { CommentRepository, VideoRepository } from "../repositories/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.videoRepository = new VideoRepository();
  }

  async create(modelId, modelType, userId, content) {
    try {
      if (modelType === "Video") {
        var commentable = await this.videoRepository.get(modelId);
      } else {
        throw new Error("unknown model type");
      }
      const comment = await this.commentRepository.create({
        content: content,
        userId: userId,
        onModel: modelType,
        commentable: modelId,
      });
      commentable.comments.push(comment);
      await commentable.save();
      return comment;
    } catch (error) {
      console.error("Something went wrong at comment service layer: " + error);
      throw error;
    }
  }
}

export default CommentService;
