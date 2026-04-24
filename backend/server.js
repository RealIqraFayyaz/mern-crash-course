import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
); ////CORS
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use("/api/products", productRouter);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // app.get("(.*)", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")
  // );
  // });
  // Using the 'splat' name tells Express this is a catch-all parameter
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
}

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});