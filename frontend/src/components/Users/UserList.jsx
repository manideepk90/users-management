import React from "react";
import UserItem from "./UserItem";
import UserService from "../../services/UserService";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  headText: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    marginBottom: "10px",
  },
  userlist: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
    maxHeight: "calc(100vh - 200px)",
    overflowY: "auto",
    gap: "10px",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: "3px solid #f2f2f2",
    gap: "20px",
  },
  verticalLine: {
    width: 1.5,
    height: 30,
    backgroundColor: "blue",
  },
  tabItem: {
    flex: 1,
    textAlign: "center",
  },
  activeTab: {
    borderBottom: "3px solid blue",
    color: "blue",
  },
};
function UserList() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const usersLoading = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const fetchUserList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.fetchUsers();
      if (response.status) {
        console.log("Users fetched successfully");
        setUsers(response.data);
      } else {
        setError("No user found");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError(
        error.response.data.error || error.response.data.error_description
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles?.headText}>Users</h1>
      {/* <div style={styles?.tabContainer}>
        <div style={{ ...styles?.tabItem, ...styles?.activeTab }}>
          <p>All Users</p>
        </div>
        <div style={styles?.verticalLine}></div>
        <div style={{ ...styles?.tabItem }}>
          <p>Friends</p>
        </div>
      </div> */}
      <div style={styles?.userlist}>
        {!loading &&
          users &&
          users.length > 0 &&
          users.map((user) => <UserItem user={user} key={user?.id} />)}
        {loading &&
          usersLoading &&
          usersLoading.map((user, index) => <UserItem loading key={index} />)}
      </div>
    </div>
  );
}

export default UserList;
