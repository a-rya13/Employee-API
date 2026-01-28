import { Routes, Route } from "react-router-dom";
import Employee from "./pages/Employees.jsx";
import Auth from "./pages/Auth.jsx";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Employee />} />
    </Routes>
  );
}

export default App;
