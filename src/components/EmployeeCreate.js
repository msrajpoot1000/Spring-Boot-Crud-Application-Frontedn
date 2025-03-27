import React, { useState } from "react";
import { addEmployee } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./styles.css";

const EmployeeCreate = () => {
  const navigate = useNavigate();
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleAdd = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.phone) return;
    await addEmployee(newEmployee);
    setNewEmployee({ name: "", email: "", phone: "" });
    navigate("/"); // Redirect after update
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Add Employee</h2>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, name: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, email: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newEmployee.phone}
          onChange={(e) =>
            setNewEmployee({ ...newEmployee, phone: e.target.value })
          }
          required
        />
        <button onClick={handleAdd}>Add Employee</button>
      </div>
    </>
  );
};

export default EmployeeCreate;
