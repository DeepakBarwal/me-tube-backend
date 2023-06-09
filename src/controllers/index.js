import { signUp, signIn, googleAuth } from "./auth-controller.js";
import {
  update,
  destroy,
  getUser,
  subscribe,
  unsubscribe,
  like,
  getUserIdsWhoLiked,
  dislike,
  getUserIdsWhoDisliked,
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
  getByTag,
  search,
} from "./video-controller.js";

import {
  addComment,
  deleteComment,
  getComments,
} from "./comment-controller.js";

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
  getByTag,
  search,
  addComment,
  deleteComment,
  getComments,
  getUserIdsWhoLiked,
  getUserIdsWhoDisliked,
};
