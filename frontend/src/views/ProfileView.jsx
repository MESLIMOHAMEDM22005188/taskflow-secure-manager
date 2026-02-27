import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ProfileView({ goBack }) {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await api.get("/users/me");
    setUser(res.data.user);
    setUsername(res.data.user.username);
  };

  const updateUsername = async () => {
    await api.patch("/users/username", { username });
    setMessage("Username updated");
  };

  const updatePassword = async () => {
    await api.patch("/users/password", {
      currentPassword,
      newPassword
    });
    setMessage("Password updated");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>Profile</h2>

        <p><strong>Username:</strong> {user.username}</p>

        <div className="profile-section">
          <h3>Change Username</h3>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={updateUsername}>Update</button>
        </div>

        <div className="profile-section">
          <h3>Change Password</h3>
          <input
            type="password"
            placeholder="Current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={updatePassword}>Update</button>
        </div>

        {message && <p>{message}</p>}

        <button onClick={goBack}>Back</button>

      </div>
    </div>
  );
}
