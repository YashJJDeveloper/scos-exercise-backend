import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); 

import uirRoutes from "./modules/user-institute-roles/uir.routes.js";
import authRoutes from "./modules/auth/auth.routes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uir", uirRoutes);
app.use("/auth", authRoutes );
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

export default app;