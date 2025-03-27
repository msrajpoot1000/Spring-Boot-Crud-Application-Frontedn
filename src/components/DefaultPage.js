import React from "react";
import { useNavigate } from "react-router-dom";

function DefaultPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <h5>Please login first</h5>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default DefaultPage;
