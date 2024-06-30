import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import InputField from "../../components/Inputs/InputField";
import Button from "../../components/buttons/Button";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const response = await AuthService.register(
      username,
      password,
      confirmPassword
    );
    if (response?.status) {
      console.log("Registration successful");
      navigate("/");
    } else {
      setError(response?.error);
      console.log("Registration failed");
    }
    setLoading(false);
  };

  //   useEffect(() => {
  //     if (AuthService.isAuthenticated()) {
  //       setLoading(true);
  //       setError("Already logged in, redirecting to home page...");
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 2000);
  //     }
  //   }, []);
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
      <p style={styles.headText}>Sign Up</p>
      <form
        style={styles.container}
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        {error && <p style={styles.error}>{error}</p>}
        <InputField
          label="Username/Email"
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
        <InputField
          label="confirm password"
          value={confirmPassword}
          inputProps={{
            type: "password",
          }}
          handleOnChange={setConfirmPassword}
        />
        <Button disabled={loading}>
          {loading ? "loading..." : "Register"}
        </Button>
      </form>
      <p>
        Already have an account? try <Link to="/login">login</Link> instead
      </p>
    </div>
  );
}

export default Register;
