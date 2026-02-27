import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/profile.css";

export default function ProfileView({ goBack, logout }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/users/me");
        const profile = res.data.user;
        setUser(profile);
        setUsername(profile.username);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load profile");
      }
    };

    loadProfile();
  }, []);

  const updateUsername = async () => {
    try {
      setError("");
      setMessage("");
      await api.patch("/users/username", { username });
      setUser((prev) => ({ ...prev, username }));
      setMessage("Username updated");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update username");
    }
  };

  const updatePassword = async () => {
    try {
      setError("");
      setMessage("");
      await api.patch("/users/password", {
        currentPassword,
        newPassword
      });
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password updated");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update password");
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <p>Loading profile...</p>
          {error && <p className="profile-error">{error}</p>}
          <button onClick={goBack}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>

        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <div className="profile-section">
          <h3>Change Username</h3>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
          <button onClick={updateUsername}>Update</button>
        </div>

        <div className="profile-section">
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={updatePassword}>Update</button>
        </div>

        {message && <p className="profile-message">{message}</p>}
        {error && <p className="profile-error">{error}</p>}

        <div className="profile-actions">
          <button onClick={goBack}>Back</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
