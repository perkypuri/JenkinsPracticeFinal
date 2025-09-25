import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  // base URL from config
  const baseUrl = `${config.url}/user`;

  // ===== FETCH ALL USERS =====
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ===== ADD USER =====
  const addUser = async () => {
    try {
      await axios.post(`${baseUrl}/adduser`, newUser);
      setNewUser({ name: "", email: "", password: "" }); // reset form
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  // ===== DELETE USER =====
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      fetchUsers(); // refresh list
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Manager</h1>

      {/* Add User Form */}
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={addUser}>Add User</button>

      {/* User List */}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
