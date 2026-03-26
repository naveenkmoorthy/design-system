import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/products";
import cartRouter from "./routes/cart";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // allows Next.js (on port 3000) to call this API
app.use(express.json()); // parses incoming JSON request bodies

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
