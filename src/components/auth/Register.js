import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api"; // Import register function

const Register = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login", { replace: true });
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData; // Remove confirmPassword

    const response = await registerUser(dataToSend); // Call API function

    if (response.success) {
      alert("Signup successful!");
      navigate("/login"); // Redirect to login page after successful signup
    } else {
      alert(response.message || "Signup failed!");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="inputbox">
          <ion-icon name="person-outline"></ion-icon>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Username</label>
        </div>

        <div className="inputbox">
          {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
          <label> Password</label>
        </div>
        <div className="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>Confirm Password</label>
        </div>
        <button type="submit">Sign Up</button>
        <div className="register">
          <p>
            Already have an account?{" "}
            <a
              className="focusClass"
              onClick={navigateLogin}
              style={{ cursor: "pointer" }}
            >
              Log In
            </a>
          </p>
        </div>
        {/* <input type="hidden" name="role" value="USER" /> */}
      </form>
    </section>
  );
};

export default Register;
