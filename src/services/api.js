import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/employees"; // Fallback URL

// Fetch all employees
// export const fetchEmployees = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/employees`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     return []; // Return an empty array to prevent app crashes
//   }
// };

const token = localStorage.getItem("token");

// export const fetchEmployees = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/employees`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     return []; // Return an empty array to prevent app crashes
//   }
// };

// Fetch a single employee by ID
export const fetchEmployees = async () => {
  if (!token) {
    console.error("No token found");
    return [];
  }

  try {
    const response = await axios.get(`${API_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`, // Token must be prefixed with "Bearer "
        "Content-Type": "application/json",
      },
    });

    // console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error.response || error);
    return [];
  }
};
export const fetchEmployeeById = async (id) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Add token in headers
      "Content-Type": "application/json",
    };

    const response = await axios.get(`${API_URL}/employees/${id}`, { headers });

    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    return null; // Return null if the employee is not found
  }
};

// Add a new employee

export const addEmployee = async (employee) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token
    const headers = {
      Authorization: `Bearer ${token}`, // Add token in headers
      "Content-Type": "application/json",
    };

    const response = await axios.post(`${API_URL}/employees`, employee, {
      headers,
    });
    console.log(employee);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    return null;
  }
};

// Update an employee by ID
export const updateEmployee = async (id, updatedEmployee) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Add token in headers
      "Content-Type": "application/json",
    };

    const response = await axios.put(
      `${API_URL}/employees/${id}`,
      updatedEmployee,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    return null;
  }
};

// Delete an employee by ID
export const deleteEmployee = async (id) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, // Add token in headers
      "Content-Type": "application/json",
    };

    await axios.delete(`${API_URL}/employees/${id}`, { headers });

    return { success: true, message: "Employee deleted successfully" };
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    return { success: false, message: "Failed to delete employee" };
  }
};



export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Registration Response:", response.data);

     return { success: true, message: response.data };
  } catch (error) {
    console.error(
      "Registration Error:",
      error.response ? error.response.data : error.message
    );

    throw new Error(error.response?.data?.message || "Registration failed!");
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed! Check your credentials.");
    }

    await Promise.resolve(localStorage.setItem("token", data.jwtToken));
    // Save token locally
    return data; // Return user data
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
