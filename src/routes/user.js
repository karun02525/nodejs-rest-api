import express from "express";
const router = express.Router();
import { auth } from "../controllers/verifyToken.js";

import {
  createUser,
  loginUser,
  getUsers,
  getuser,
  deleteUser,
  updateUser,
} from "../controllers/user_ctrl.js";

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/", auth, getUsers);

router.get("/find", auth, getuser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
