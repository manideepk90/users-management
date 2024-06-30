import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import UserList from "../components/Users/UserList";
import { Outlet, useNavigate } from "react-router-dom";
import { apiUrl } from "../constants/secrets";
import axios from "axios";
import AuthService from "../services/AuthService";

const styles = {
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "10px",
    width: "100%",
    flexWrap: "wrap",
    gap: "20px",
  },
  aside: {
    flex: 2.2,
  },
  section: {
    // width: "70%",
    flex: 3,
  },
  fixedContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100dvh",
    zIndex: 1000,
    color: "white",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
function Home() {
  const checkAuth = async () => {
    const response = await axios.get(apiUrl + "user", {
      headers: {
        Authorization: AuthService.getAuthHeader(),
      },
    });
    return response;
  };
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  useEffect(() => {
    checkAuth()
      .then((response) => {
        if (response.status === 401) {
          AuthService.logout();
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          AuthService.logout();
          setError("Session Expired, redirecting to login page...");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      });
  }, []);

  return (
    <>
      {error && (
        <div style={styles.fixedContainer}>
          <div style={styles.error}>
            <h3>{error}</h3>
          </div>
        </div>
      )}
      <NavigationBar />
      <main style={styles.main}>
        <aside style={styles.aside}>
          <UserList />
        </aside>
        <section style={styles.section}>
          <Outlet />
          {/* <UserDetails /> */}
        </section>
      </main>
    </>
  );
}

export default Home;
