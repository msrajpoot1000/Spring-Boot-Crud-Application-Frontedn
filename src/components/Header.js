import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <nav className="header">
      <h2>Employee Management</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Add Employee</Link>

      </div>
    </nav>
  );
};

export default Header;
