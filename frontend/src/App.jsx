// App.jsx (English messages only)

import { useState } from "react";
import api from "./api/axios";
import TaskController from "./controllers/TaskController";
import { LoginView } from "./views/LoginView";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email.includes("@")) {
      setError("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setError(null);

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError("Incorrect email or password.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return (
      <LoginView
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
      />
    );
  }

  return <TaskController token={token} logout={logout} />;
}

export default App;
