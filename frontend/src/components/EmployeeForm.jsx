import { useState, useEffect } from "react";
import "../components/EmployeeForm.css";

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    isActive: true,
    createdBy: "",
    updatedBy: "",
  });

  //  Error state for inline validation
  const [errors, setErrors] = useState({
    dob: "",
  });

  // Prefill form when employee changes (EDIT MODE)
  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId || "",
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        dob: employee.dob ? employee.dob.slice(0, 10) : "",
        phone: employee.phone || "",
        isActive: employee.isActive ?? true,
        createdBy: employee.createdBy || "",
        updatedBy: employee.updatedBy || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts correcting
    if (name === "dob") {
      setErrors((prev) => ({ ...prev, dob: "" }));
    }
  };

  // Inline DOB validation (NO alerts)
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

    onSave(formData);
  };

  const isEditMode = Boolean(employee);

  return (
    <div>
      <h3>{isEditMode ? "Edit Employee" : "Create Employee"}</h3>

      <form onSubmit={handleSubmit}>
        {/* Employee ID */}
        <div>
          <label>Employee ID:</label>
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            disabled={isEditMode}
            placeholder="Enter employee ID"
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

        {/*  DOB with inline error */}
        <div>
          <label>Date of Birth:</label>
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split("T")[0]}
          />
          {errors.dob && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "13px",
                marginTop: "6px",
              }}
            >
              {errors.dob}
            </p>
          )}
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

        <div>
          <label>Created By:</label>
          <input
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            disabled
          />
        </div>

        <div>
          <label>Updated By:</label>
          <input
            name="updatedBy"
            value={formData.updatedBy}
            onChange={handleChange}
          />
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
