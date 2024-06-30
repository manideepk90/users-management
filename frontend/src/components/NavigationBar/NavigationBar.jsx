import React from "react";
import Button from "../buttons/Button";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";

function NavigationBar() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 10px",
      width: "100%",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    ul: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      listStyle: "none",
      padding: 0,
    },
    li: {
      padding: "10px",
      cursor: "pointer",
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
    <header style={styles.container}>
      <nav style={styles.nav}>
        <Link style={styles.headText} to={"/"}>
          User Manager
        </Link>
        {/* <ul style={styles.ul}>
          <li style={styles.li}>Home</li>
        </ul> */}
        <Button onClick={AuthService.logout}>Logout</Button>
      </nav>
    </header>
  );
}

export default NavigationBar;
