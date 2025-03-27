import React from "react";
import { useNavigate } from "react-router-dom";

function DefaultPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div>
      {token ? <h1>You are logged in</h1> : <h1>Page Not Found</h1>}

      
      {token ? (
        <button onClick={() => navigate("/employees-list")}>Dashboard</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
}

export default DefaultPage;
