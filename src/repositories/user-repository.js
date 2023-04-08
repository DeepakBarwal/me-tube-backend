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

  async subscribe(id, subber) {
    try {
      const user = await User.findById(subber);
      const channel = await User.findById(id);
      const isAlreadySubscribed = user.subscribedToUsers.filter((u) =>
        u._id.equals(channel._id)
      );
      if (isAlreadySubscribed.length === 0) {
        user.subscribedToUsers.push(id);
        channel.subscribers.push(subber);
        await user.save();
        await channel.save();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async unsubscribe(id, subber) {
    try {
      const user = await User.findById(subber);
      const channel = await User.findById(id);
      const isAlreadySubscribed = user.subscribedToUsers.filter((u) =>
        u._id.equals(channel._id)
      );
      if (isAlreadySubscribed.length !== 0) {
        user.subscribedToUsers = user.subscribedToUsers.filter(
          (c) => !c._id.equals(channel._id)
        );
        channel.subscribers = channel.subscribers.filter(
          (u) => !u._id.equals(user._id)
        );
        await user.save();
        await channel.save();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWithSubscribers(id) {
    try {
      const user = await User.findById(id).populate(
        "subscribers subscribedToUsers"
      );
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserRepository;
