import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../context/authStore";

// Components
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

  //  Form state for creating a new user
  const [newUser, setNewUser] = useState({ email: "", role: "user" });

  //  Handle form inputs (email + role)
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  //  Add a new user to the list
  const addUser = () => {
    if (!newUser.email) return alert("Email is required!");
    const updatedUsers = [...users, { id: Date.now(), ...newUser }];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setNewUser({ email: "", role: "user" }); // reset form
  };

  //  Delete a user by ID
  const deleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
  };

  // 7️⃣ Update role of a user
  const updateRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* User creation form */}
      <UserForm newUser={newUser} handleChange={handleChange} addUser={addUser} />

      {/* Desktop table view */}
      <UserTable users={users} updateRole={updateRole} deleteUser={deleteUser} />

      {/* Mobile cards view */}
      <div className="sm:hidden space-y-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            updateRole={updateRole}
            deleteUser={deleteUser}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
