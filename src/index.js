import express from "express";
import dotevn from "dotenv";
import userRoutes from "./routes/User.js";
import authRoutes from "./routes/Authentication.js";
import "../src/config/DatabaseConfig.js";

dotevn.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to homepage"));

app.use("/user", userRoutes);

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server runging on port ${PORT}`);
});
