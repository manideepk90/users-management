import React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import UserList from "../components/Users/UserList";
import UserDetails from "../components/Users/UserDetails";
import { Outlet } from "react-router-dom";

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
};
function Home() {
  return (
    <>
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
