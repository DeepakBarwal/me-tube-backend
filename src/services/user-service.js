import { UserRepository } from "../repositories/index.js";
import { createError } from "../utils/error.js";

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

  async googleAuth(userData) {
    try {
      const user = await this.userRepository.getByName(userData.name);
      if (user) {
        const token = user.genJWT();
        const { password, ...withoutPassword } = user._doc;
        return { ...withoutPassword, token };
      } else {
        const newUser = await this.userRepository.create({
          ...userData,
          fromGoogle: true,
        });
        const token = newUser.genJWT();
        return { ...newUser._doc, token };
      }
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async updateUser(idFromParams, idFromCookie, data) {
    try {
      if (idFromParams === idFromCookie) {
        const updatedUser = await this.userRepository.update(
          idFromParams,
          data
        );
        return updatedUser;
      } else {
        throw createError(
          new Error("You can only update your own account"),
          403
        );
      }
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async deleteUser(idFromParams, idFromCookie) {
    try {
      if (idFromParams === idFromCookie) {
        const deletedUser = await this.userRepository.destroy(idFromParams);
        return deletedUser;
      } else {
        throw createError(
          new Error("You can only delete your own account"),
          403
        );
      }
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async getUser(idFromParams) {
    try {
      const user = await this.userRepository.get(idFromParams);
      if (!user) {
        throw createError(new Error("User not found"), 404);
      }
      return user;
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async subscribeToUser(channelId, userId) {
    try {
      if (userId) {
        await this.userRepository.subscribe(channelId, userId);
        const user = await this.userRepository.getWithSubscribers(userId);
        return user;
      } else {
        throw createError(
          new Error("You should be logged in first to perform this action"),
          403
        );
      }
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }

  async unsubscribeToUser(channelId, userId) {
    try {
      if (userId) {
        await this.userRepository.unsubscribe(channelId, userId);
        const user = await this.userRepository.getWithSubscribers(userId);
        return user;
      } else {
        throw createError(
          new Error("You should be logged in first to perform this action"),
          403
        );
      }
    } catch (error) {
      console.error("Something went wrong at user service layer: " + error);
      throw error;
    }
  }
}

export default UserService;
