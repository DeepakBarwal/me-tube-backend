import CrudRepository from "./crud-repository.js";
import Like from "../models/like.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }

  async findByUserAndLikable(data) {
    try {
      const like = await Like.findOne(data);
      return like;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByLikeable(id) {
    try {
      const response = await this.model.findOne({ likeable: id });
      return response;
    } catch (error) {
      console.error("Something went wrong at crud repo layer: " + error);
      throw error;
    }
  }
}

export default LikeRepository;
