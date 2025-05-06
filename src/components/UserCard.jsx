import React from "react";

/**
 * UserCard Component
 * - Displays user details in a card (for mobile)
 * - Props:
 *   - user: Single user object
 *   - updateRole: Function to change user role
 *   - deleteUser: Function to delete user
 */
const UserCard = ({ user, updateRole, deleteUser }) => {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <p><span className="font-semibold">ID:</span> {user.id}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>

      {/* Role selector */}
      <div className="my-2">
        <label className="font-semibold mr-2">Role:</label>
        <select
          className="border p-1 w-full mt-1"
          value={user.role}
          onChange={(e) => updateRole(user.id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Delete user button */}
      <button
        className="bg-red-500 text-white px-3 py-1 w-full mt-2 cursor-pointer"
        onClick={() => deleteUser(user.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;