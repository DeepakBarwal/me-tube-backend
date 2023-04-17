import CrudRepository from "./crud-repository.js";
import Dislike from "../models/dislike.js";

class DislikeRepository extends CrudRepository {
  constructor() {
    super(Dislike);
  }

  async findByUserAndDisLikable(data) {
    try {
      const dislike = await this.model.findOne(data);
      return dislike;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getByDislikeable(data) {
    try {
      const response = await this.model.findOne(data);
      return response;
    } catch (error) {
      console.error("Something went wrong at crud repo layer: " + error);
      throw error;
    }
  }
}

export default DislikeRepository;
