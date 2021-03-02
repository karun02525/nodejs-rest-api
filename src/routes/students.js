import expres from "express";
const router = expres.Router();
import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student_controller.js";

router.post("/", createStudent);

router.get("/", getStudents);

router.get("/:_id", getStudent);

router.patch("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;
