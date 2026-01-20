import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employee.routes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); //body-parser

// Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("Employee API is running ");
});

// Mounting Employee routes
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

export default app;
