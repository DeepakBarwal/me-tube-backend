import express from "express";
import {
  signUp,
  signIn,
  googleAuth,
} from "../../controllers/auth-controller.js";

const router = express.Router();

// Create user
router.post("/signup", signUp);
// Sign In
router.post("/signin", signIn);
// Google Auth
router.post("/google", googleAuth);

export default router;
