import express from "express";
import {
  loginEmployee,
  registerEmployee,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginEmployee);
router.post("/register", registerEmployee);

export default router;
