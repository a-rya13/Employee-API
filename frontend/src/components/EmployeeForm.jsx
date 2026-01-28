import { useState, useEffect } from "react";
import "../components/EmployeeForm.css";

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const isEditMode = Boolean(employee);

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    isActive: true,
    createdBy: "",
    updatedBy: "",
  });

  const [errors, setErrors] = useState({ dob: "" });

  // Prefill form when editing
  useEffect(() => {
    if (employee) {
      setFormData((prev) => ({
        ...prev,
        employeeId: employee.employeeId || "",
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        dob: employee.dob ? employee.dob.slice(0, 10) : "",
        phone: employee.phone || "",
        isActive: employee.isActive ?? true,
        createdBy: employee.createdBy || "",
        updatedBy: employee.updatedBy || "",
        password: "", // keep empty in edit mode
      }));
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "dob") {
      setErrors((prev) => ({ ...prev, dob: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let dobError = "";

    if (formData.dob) {
      const dob = new Date(formData.dob);
      const today = new Date();

      if (dob >= today) {
        dobError = "Date of Birth must be in the past";
      } else {
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }
        if (age < 18) {
          dobError = "Employee must be at least 18 years old";
        }
      }
    }

    if (dobError) {
      setErrors({ dob: dobError });
      return;
    }

    // Build payload correctly
    const payload = isEditMode
      ? {
          employeeId: Number(formData.employeeId),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          phone: formData.phone,
          isActive: formData.isActive,
          updatedBy: formData.updatedBy,
        }
      : {
          employeeId: Number(formData.employeeId),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password, // REQUIRED ON CREATE
          dob: formData.dob,
          phone: formData.phone,
          isActive: formData.isActive,
          createdBy: formData.createdBy,
        };

    onSave(payload);
  };

  return (
    <div>
      <h3>{isEditMode ? "Edit Employee" : "Create Employee"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            disabled={isEditMode}
          />
        </div>

        <div>
          <label>First Name:</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/*  PASSWORD ONLY FOR CREATE */}
        {!isEditMode && (
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <label>Date of Birth:</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.dob && <p style={{ color: "#dc2626" }}>{errors.dob}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <div style={{ marginTop: "15px" }}>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
