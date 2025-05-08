import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import UserCard from "../components/UserCard";

/**
 * AdminDashboard Page
 * - Admin-only page for managing users
 * - Features: Add user, delete user, change role
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Redirect non-admins to /dashboard
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Users state (stored in localStorage for demo)
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  // Form state for creating a new user
  const [newUser, setNewUser] = useState({ email: "", role: "user" });

  // Handle form inputs (email + role)
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add a new user to the list
  const addUser = () => {
    if (!newUser.email) return alert("Email is required!");
    const updatedUsers = [...users, { id: Date.now(), ...newUser }];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewUser({ email: "", role: "user" }); // reset form
  };

  // Delete a user by ID
  const deleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  };

  // Update role of a user
  const updateRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-4 sm:p-8  min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800">
             User Management
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Manage users, assign roles, and control access
          </p>
        </div>

        {/* User creation form */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            ➕ Add New User
          </h2>
          <UserForm newUser={newUser} handleChange={handleChange} addUser={addUser} />
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            👥 User List 
          </h2>
          <UserTable users={users} updateRole={updateRole} deleteUser={deleteUser} />
        </div>

        {/* Mobile cards view */}
        <div className="sm:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <UserCard
                user={user}
                updateRole={updateRole}
                deleteUser={deleteUser}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
