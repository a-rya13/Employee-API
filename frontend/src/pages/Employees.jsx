import { useEffect, useState } from "react";
import {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
} from "../services/employeeService";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import "./Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit related state
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setIsEditing(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedEmployee) {
        const updatedEmployee = await updateEmployee(
          selectedEmployee._id,
          formData
        );

        setEmployees((prev) =>
          prev.map((emp) =>
            emp._id === updatedEmployee._id ? updatedEmployee : emp
          )
        );
      } else {
        const newEmployee = await createEmployee(formData);
        setEmployees((prev) => [...prev, newEmployee]);
      }

      setIsEditing(false);
      setSelectedEmployee(null);
    } catch (err) {
      alert(
        selectedEmployee
          ? "Failed to update employee"
          : "Failed to create employee"
      );
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedEmployee(null);
  };

  if (loading) return <p className="status-text">Loading employees...</p>;
  if (error) return <p className="status-text">{error}</p>;

  return (
    <div className="page-container">
      {isEditing ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="page-header">
            <h2>Employee List</h2>
            <button onClick={handleCreate}>Create Employee</button>
          </div>

          <div className="table-wrapper">
            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Employees;
