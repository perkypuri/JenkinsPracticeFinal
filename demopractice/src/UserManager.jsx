import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import config from "./config"; // relative backend URL

const BASE_URL = `${config.url}/user`;  // will resolve to /userpractice/user

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/viewall`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    try {
      await axios.post(`${BASE_URL}/adduser`, user);
      setMessage("User added successfully.");
      fetchAllUsers();
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      setMessage("User deleted successfully.");
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user.");
    }
  };

  const resetForm = () => {
    setUser({ name: "", email: "", gender: "", contact: "" });
  };

  return (
    <div className="student-container">
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>User Management</h2>

      <div className="form-grid">
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <select name="gender" value={user.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <input type="text" name="contact" placeholder="Contact" value={user.contact} onChange={handleChange} />
      </div>

      <div className="btn-group">
        <button className="btn-blue" onClick={addUser}>Add User</button>
        <button className="btn-gray" onClick={resetForm}>Reset</button>
      </div>

      <h3>All Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.gender}</td>
                  <td>{u.contact}</td>
                  <td>
                    <button className="btn-red" onClick={() => deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManager;
