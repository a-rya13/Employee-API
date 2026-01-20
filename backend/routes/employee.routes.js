import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getAllEmployees); // GET all
router.get("/:id", getEmployeeById); // GET by id
router.post("/", createEmployee); //create employees
router.put("/:id", updateEmployee); // UPDATE
router.delete("/:id", deleteEmployee); // DELETE

export default router;
