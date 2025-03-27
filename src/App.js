import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeEdit from "./components/EmployeeEdit";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DefaultPage from "./components/DefaultPage";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {token ? (
          <>
            <Route path="/employees-list" element={<EmployeeList />} />
            <Route path="/create" element={<EmployeeCreate />} />
            <Route path="/edit/:id" element={<EmployeeEdit />} />

            {/* Redirect unknown routes to home */}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Redirect unauthorized users to login */}
          </>
        )}
        <Route path="*" element={<DefaultPage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
