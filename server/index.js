import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 IMPORTANT for render
const PORT = process.env.PORT || 5000;

// fix __dirname (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- API TEST ----------
app.get("/api", (req, res) => {
  res.send("Backend running 🚀");
});

// ---------- REACT BUILD SERVE ----------
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});