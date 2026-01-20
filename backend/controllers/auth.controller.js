import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

// REGISTER CONTROLLER

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // 2. Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already registered",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10); //add salting 10 rounds

    // 4. Create employee and saves employee in DB
    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE",
    });

    // 5. Send response
    res.status(201).json({
      message: "Employee registered successfully",
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// LOGIN CONTROLLER

export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find employee
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isPasswordMatch = await bcrypt.compare(password, employee.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: employee._id,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", //expires in one day
      },
    );

    // 5. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
