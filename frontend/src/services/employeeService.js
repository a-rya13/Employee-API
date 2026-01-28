import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// helper to attach token
const authConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET all employees
export const getAllEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}/employees`, authConfig());
  return response.data;
};

// CREATE employee
export const createEmployee = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/employees`,
    data,
    authConfig(),
  );
  return response.data;
};

// UPDATE employee
export const updateEmployee = async (id, data) => {
  const response = await axios.put(
    `${API_BASE_URL}/employees/${id}`,
    data,
    authConfig(),
  );
  return response.data;
};

// DELETE employee
export const deleteEmployee = async (id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/employees/${id}`,
    authConfig(),
  );
  return response.data;
};
