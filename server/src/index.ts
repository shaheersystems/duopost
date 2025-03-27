import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.route";
import postRoutes from "./routes/post.route";
import "./lib/env";
import { auth } from "./middlewares/auth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("/logger", (req, res, next) => {
  console.log(`API is being used: ${req.url}`);
  next();
});
app.use("/api/auth", userRoutes);

app.use("/api", auth, postRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
});
