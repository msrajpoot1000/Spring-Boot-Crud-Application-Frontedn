import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById, updateEmployee } from "../services/api";
import Header from "./Header";
import "./styles.css";

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const loadEmployeeData = async () => {
    const data = await fetchEmployeeById(id);
    if (data) setEmployee(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { id, ...employee }; // Send ID & Data
    await updateEmployee(id, updatedData);
    navigate("/"); // Redirect after update
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2>Edit Employee</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label for="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label for="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label for="phone">Phone:</label>
            <input
              id="phone"
              type="text"
              placeholder="Enter Phone Number"
              value={employee.phone}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="updateBtn">
            Update Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default EmployeeEdit;
