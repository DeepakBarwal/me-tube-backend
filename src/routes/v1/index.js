import express from "express";

import {
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
} from "../../controllers/index.js";

import { verifyToken } from "../../middlewares/verifyJWT.js";

const router = express.Router();

// Create user
router.post("/signup", signUp);
// Sign In
router.post("/signin", signIn);
// Google Auth
router.post("/google", googleAuth);

// update user
router.put("/users/:id", verifyToken, update);
// delete user
router.delete("/users/:id", verifyToken, destroy);
// get a user
router.get("/users/:id", getUser);
// subscribe a user
router.post("/users/subscribe/:id", verifyToken, subscribe);
// unsubscribe a user
router.post("/users/unsubscribe/:id", verifyToken, unsubscribe);
// like a video
router.post("/likes/toggle", verifyToken, like);
router.get("/likes/:id", getUserIdsWhoLiked);
// dislike a video
router.post("/dislikes/toggle", verifyToken, dislike);
router.get("/dislikes/:id", getUserIdsWhoDisliked);

router.get("/videos/random", random);
router.get("/videos/trend", trend);
router.get("/videos/subscriptions", verifyToken, sub);
router.post("/videos", verifyToken, addVideo);
router.get("/videos/tags", getByTag);
router.get("/videos/search", search);
router.put("/videos/view/:id", addViews);
router.put("/videos/:id", verifyToken, updateVideo);
router.delete("/videos/:id", verifyToken, deleteVideo);
router.get("/videos/:id", getVideo);

router.post("/comments", verifyToken, addComment);
router.delete("/comments/:id", verifyToken, deleteComment);
router.get("/comments/:videoId", getComments);

export default router;
