import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../context/authStore';

const Register = () => {
  const navigate = useNavigate(); // enables navigation after registration
  const { login } = useAuthStore();

  // state variables to store user inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("user");

  const handleRegister = () => {
    // Get existing users from localStorage or initialize an empty array
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists
    const existingUser = storedUsers.find((user) => user.email === email);

    if (existingUser) {
      alert("This email is already registered. Please log in.");
      return;
    }

    // Validate required fields & password strength
    if (!email || password.length < 6) {
      alert("Email is required & password must be at least 6 characters.");
      return;
    }

    // Create a new user object
    const newUser = {
      id: Date.now(), // Assign a unique ID
      email,
      role, // "admin" or "user"
    };

    // Add the new user to the list & update localStorage
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Log the new user in immediately after registration
    login(newUser);

    // Redirect based on role
    if (newUser.role === "admin") {
      navigate("/admin"); // Admins go to Admin Dashboard
    } else {
      navigate("/dashboard"); // Users go to Task Dashboard
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100">
      <div className="flex flex-col bg-white p-8 rounded shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">Task Management App</h2>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Registration Page</h2>

        <label htmlFor="email" className='self-start mb-1 text-gray-700'>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="border p-2 mb-2 w-full rounded" type="email" name="email" placeholder="example@gmail.com" />

        <label htmlFor="password" className='self-start mb-1 text-gray-700'>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-full rounded" type="password" name="password" placeholder="*************" />

        <label htmlFor="role" className='self-start mb-1 text-gray-700'>Role</label>
        <select onChange={(e) => setRole(e.target.value)} className="border p-2 mb-2 w-full rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 w-full mt-2 rounded cursor-pointer hover:bg-blue-700">Register</button>

      </div>
    </div>
  );
};

export default Register;