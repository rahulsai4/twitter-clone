import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.model.js";
import { response } from "express";
import Notification from "../models/notification.model.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        if (posts.length == 0) return res.status(200).json([]);
        else return res.status(200).json(posts);
    } catch (error) {
        console.log("error in get all posts controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id;
        const user = User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!text && !img)
            return res
                .status(400)
                .json({ error: "Post must have text or image" });
        if (img) {
            let uploadRes = await cloudinary.uploader.upload(img);
            img = uploadRes.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            img,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("error in create post controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ error: "Unauthorized to delete this post" });
        }

        if (post.img) {
            await cloudinary.uploader.destroy(
                post.img.split("/").pop().split(".")[0]
            );
        }
        await Post.findByIdAndDelete(id);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log("error in delete post controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userLikedPost = post.likes.includes(userId);
        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne(
                { _id: userId },
                { $pull: { likedPosts: postId } }
            );
            res.status(200).json({ message: "Post unliked" });
        } else {
            post.likes.push(userId);
            await post.save();
            await User.updateOne(
                { _id: userId },
                { $push: { likedPosts: postId } }
            );
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();
            res.status(200).json({ message: "Post liked" });
        }
    } catch (error) {
        console.log("error in like unlike post controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ error: "Text Field is required" });
        }

        const post = await Post.findById(postId);
        console.log(post);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const comment = { user: userId, text };
        post.comments.push(comment);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.log("error in comment on post controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getLikedPosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });

        res.status(200).json(likedPosts);
    } catch (error) {
        console.log("error in get liked posts controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getFollowingPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const following = user.following;
        const followingPosts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });
        return res.status(200).json(followingPosts);
    } catch (error) {
        console.log(
            "error in get following posts controller: " + error.message
        );
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password",
            })
            .populate({
                path: "comments.user",
                select: "-password",
            });
        res.status(200).json(posts);
    } catch (error) {
        console.log("error in get get user posts controller: " + error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
