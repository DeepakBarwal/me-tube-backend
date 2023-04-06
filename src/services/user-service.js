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

  async signIn(userData) {
    try {
      const user = await this.userRepository.getByName(userData.name);
      if (!user) {
        throw new Error("SignIn Error - User not found");
      }
      if (!user.comparePassword(userData.password)) {
        throw new Error("SignIn Error - Incorrect password");
      }
      const token = user.genJWT();
      const { password, ...withoutPassword } = user._doc;
      return { withoutPassword, token };
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async googleAuth() {}
}

export default UserService;
