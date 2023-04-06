import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getByName(name) {
    try {
      const user = await User.findOne({
        name,
      });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserRepository;
