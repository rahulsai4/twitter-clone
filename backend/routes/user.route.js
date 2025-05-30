import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    followUnfollowUser,
    getSuggestedUsers,
    getUserProfile,
    updateUser,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/profile/:username", protectRoute, getUserProfile);
userRoutes.get("/suggested", protectRoute, getSuggestedUsers);
userRoutes.post("/follow/:id", protectRoute, followUnfollowUser);
userRoutes.post("/update", protectRoute, updateUser);

export default userRoutes;
