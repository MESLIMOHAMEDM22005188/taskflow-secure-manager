// LoginView.jsx (English messages only + disabled button)

export function LoginView({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  error
}) {
  const isDisabled = !email || password.length < 6;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>TaskFlow</h2>
        <p style={styles.subtitle}>Sign in</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin} disabled={isDisabled}>
          Sign in
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "320px",
    textAlign: "center"
  },
  title: { marginBottom: "5px" },
  subtitle: { marginBottom: "20px", color: "#777" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer"
  },
  error: { color: "red", marginBottom: "10px" }
};
