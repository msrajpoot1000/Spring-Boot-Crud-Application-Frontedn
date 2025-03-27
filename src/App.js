import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeEdit from "./components/EmployeeEdit";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/create" element={<EmployeeCreate />} />
            <Route path="/edit/:id" element={<EmployeeEdit />} />
            <Route path="*" element={<Login />} />{" "}
            {/* Redirect unknown routes to home */}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />{" "}
            {/* Redirect unauthorized users to login */}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
