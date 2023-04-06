import { UserRepository } from "../repositories/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
}

export default UserService;
