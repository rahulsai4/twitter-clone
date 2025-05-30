import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controller.js";


const postRoutes = express.Router();

postRoutes.get("/all", protectRoute, getAllPosts);
postRoutes.get("/following", protectRoute, getFollowingPosts);
postRoutes.get("/user/:username", protectRoute, getUserPosts);
postRoutes.get("/likes/:id", protectRoute, getLikedPosts);
postRoutes.post("/create", protectRoute, createPost);
postRoutes.post("/like/:id", protectRoute, likeUnlikePost);
postRoutes.post("/comment/:id", protectRoute, commentOnPost);
postRoutes.delete("/:id", protectRoute, deletePost);


export default postRoutes;
