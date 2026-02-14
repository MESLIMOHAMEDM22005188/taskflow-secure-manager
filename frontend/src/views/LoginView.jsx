import "../assets/css/login.css";

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
    <div className="login-container">
      <form className="form" autoComplete="off">
        
        <div className="control">
          <h1>Sign In</h1>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="control block-cube block-input">
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="bg-top"><div className="bg-inner"></div></div>
          <div className="bg-right"><div className="bg-inner"></div></div>
          <div className="bg"><div className="bg-inner"></div></div>
        </div>

        <div className="control block-cube block-input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="bg-top"><div className="bg-inner"></div></div>
          <div className="bg-right"><div className="bg-inner"></div></div>
          <div className="bg"><div className="bg-inner"></div></div>
        </div>

        <button
          type="button"
          className="btn block-cube block-cube-hover"
          onClick={handleLogin}
          disabled={isDisabled}
        >
          <div className="bg-top"><div className="bg-inner"></div></div>
          <div className="bg-right"><div className="bg-inner"></div></div>
          <div className="bg"><div className="bg-inner"></div></div>
          <div className="text">Log In</div>
        </button>

      </form>
    </div>
  );
}
