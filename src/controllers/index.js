import { signUp, signIn, googleAuth } from "./auth-controller.js";
import {
  update,
  destroy,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "./user-controller.js";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addViews,
  trend,
  random,
  sub,
} from "./video-controller.js";

export {
  signUp,
  signIn,
  googleAuth,
  update,
  destroy,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addViews,
  trend,
  random,
  sub,
};
