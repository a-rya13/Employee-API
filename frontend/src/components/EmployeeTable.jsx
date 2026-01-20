import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  // Guard clause
  if (!Array.isArray(employees)) {
    return <p>No employee data available</p>;
  }

  if (employees.length === 0) {
    return <p>No employees found</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Phone</th>
          <th>Active</th>
          <th>Created By</th>
          <th>Created At</th>
          <th>Updated By</th>
          <th>Updated At</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp._id}>
            {/*  Show numeric employeeId */}
            <td>{emp.employeeId}</td>

            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td>{emp.email}</td>
            <td>{emp.dob?.slice(0, 10)}</td>
            <td>{emp.phone}</td>
            <td>{emp.isActive ? "Yes" : "No"}</td>
            <td>{emp.createdBy}</td>
            <td>{emp.createdAt?.slice(0, 10)}</td>
            <td>{emp.updatedBy}</td>
            <td>{emp.updatedAt?.slice(0, 10)}</td>

            {/* Edit Button */}
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
            </td>

            {/* Delete Button (uses MongoDB _id internally) */}
            <td>
              <button onClick={() => onDelete(emp._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
