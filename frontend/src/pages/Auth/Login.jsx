import React, { useEffect, useState } from "react";
import InputField from "../../components/Inputs/InputField";
import Button from "../../components/buttons/Button";
import AuthService from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const response = await AuthService.login(username, password);
    if (response?.status) {
      console.log("Login successful");
      navigate("/");
    } else {
      setError(response?.error);
      console.log("Login failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      setLoading(true);
      setError("Already logged in, redirecting to home page...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      width: "100%",
      color: AuthService.isAuthenticated() ? "green" : "red",
      padding: 10,
      border: AuthService.isAuthenticated()
        ? "1px solid green"
        : "1px solid red",
      borderRadius: 4,
    },
    headText: {
      textAlign: "center",
      fontSize: "30px",
      fontWeight: "bold",
      color: "black",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <p style={styles.headText}>Login</p>
      <form
        style={styles.container}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {error && <p style={styles.error}>{error}</p>}
        <InputField
          label="username"
          value={username}
          handleOnChange={setUsername}
        />
        <InputField
          label="password"
          value={password}
          inputProps={{
            type: "password",
          }}
          handleOnChange={setPassword}
        />
        <Button disabled={loading}>{loading ? "loading..." : "Login"}</Button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
