import { UserRepository } from "../repositories/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(userData) {
    try {
      const newUser = await this.userRepository.create(userData);
      return newUser;
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async signIn() {
    try {
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async googleAuth() {}
}

export default UserService;
