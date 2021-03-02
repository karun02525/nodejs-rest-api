import express from "express";
import dotevn from "dotenv";
import studentRoutes from "./routes/students.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import "./db/conn.js";

dotevn.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to homepage"));

app.use("/students", studentRoutes);

app.use("/user", userRoutes);

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`server runging on port ${PORT}`);
});
