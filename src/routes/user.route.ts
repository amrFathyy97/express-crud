import express from "express";
import { userController } from "../controllers/user.controller";

const router = express.Router();


router.get("/", userController.findAll.bind(userController))
router.get("/:id", userController.findOne.bind(userController))
router.post("/", userController.createUser.bind(userController))
router.put("/:id", userController.updateUser.bind(userController))
router.delete("/:id", userController.deleteUser.bind(userController))


export default router;