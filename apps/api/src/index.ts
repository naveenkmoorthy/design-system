import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/products";
import cartRouter from "./routes/cart";
import authRouter from "./routes/auth";
import cartMergeRouter from "./routes/cartMerge";
import checkoutRouter from "./routes/checkout";
import orderRouter from "./routes/order";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // allows Next.js (on port 3000) to call this API
app.use(express.json()); // parses incoming JSON request bodies

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartMergeRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
