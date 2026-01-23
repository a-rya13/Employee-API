import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

// REGISTER CONTROLLER

export const registerEmployee = async (req, res) => {
  try {
    const { employeeId, firstName, lastName, email, password, role } = req.body;

    //  Validate input ((matches the schema/model)
    if (!employeeId || !firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  Check if employee already exists
    const existingEmployee = await Employee.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee already registered",
      });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10); //added salting

    //  Create employee
    const employee = await Employee.create({
      employeeId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE",
    });

    //  Send response
    res.status(201).json({
      message: "Employee registered successfully",
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
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

//  login controller

export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //  Find employee (explicitly select password)
    const employee = await Employee.findOne({ email }).select("+password");

    if (!employee) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //  Compare password
    const isPasswordMatch = await bcrypt.compare(password, employee.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    //  Generate JWT
    const token = jwt.sign(
      {
        id: employee._id,
        role: employee.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d", //password is valid for 1 day
      },
    );

    //  Send response
    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName,
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
