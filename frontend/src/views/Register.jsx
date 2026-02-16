import { useState } from "react";
import "../assets/css/register.css";

export default function Register({ onSuccess, goLogin, goHome }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      onSuccess(data.token);

    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="form">
        <h1>Create Account</h1>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p onClick={goLogin} style={{ cursor: "pointer" }}>
          Already have account
        </p>

        <p onClick={goHome} style={{ cursor: "pointer" }}>
          Back
        </p>
      </div>
    </div>
  );
}
