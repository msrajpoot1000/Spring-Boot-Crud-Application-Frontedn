import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api"; // Import the login function

const Login = () => {
  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate("/register", { replace: true });
  };
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(formData.username, formData.password);
      alert("Login successful!");
       navigate("/employees-list");
      window.location.reload();
     
    } catch (err) {
      setError("something went wrong! please try again");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && <div className="text-center text-red-500 mb-2">{error}</div>}

        <div className="relative mb-4">
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>

        <div className="relative mb-4">
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full pl-10 p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Log in
        </button>
        <div className="register">
          <p>
            Already have an account?{" "}
            <a
              className="focusClass"
              onClick={navigateRegister}
              style={{ cursor: "pointer" }}
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
