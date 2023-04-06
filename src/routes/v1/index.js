import express from "express";

import { signUp, signIn, googleAuth } from "../../controllers/index.js";
import {
  update,
  destroy,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
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
router.delete("/users/:id", destroy);

// get a user
router.get("/users/:id", getUser);

// subscribe a user
router.post("/users/subscribe/:id", subscribe);

// unsubscribe a user
router.post("/users/unsubscribe/:id", unsubscribe);

// like a video
router.post("/likes/toggle", like);

// dislike a video
router.post("/dislikes/toggle", dislike);

export default router;
