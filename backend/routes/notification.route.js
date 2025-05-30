import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/", protectRoute, getNotifications);
notificationRoutes.delete("/", protectRoute, deleteNotifications);

export default notificationRoutes;