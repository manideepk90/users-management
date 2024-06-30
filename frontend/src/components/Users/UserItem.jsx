import React from "react";
import ProfileImage from "../Profile/ProfileImage";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    boxSizing: "border-box",
    gap: 5,
    borderRadius: 5,
    padding: "5px 10px",
    // backgroundColor: "F2F2F2",
    boxShadow: "0 1px 5px 0 #e4e4e4",
    userSelect: "none",
    cursor: "pointer",
  },
  userNameText: {
    fontSize: "16px",
    fontWeight: "550",
    margin: 0,
    marginBottom: "0px",
  },
  emailText: {
    fontSize: "16px",
    fontWeight: "500",
    margin: 0,
  },
  friendItem: {
    // backgroundColor: "#00ff00",
    height: 30,
    border: "1px solid #00ff00",
    borderRadius: 5,
    padding: "0px 10px",
    boxSizing: "border-box",
  },
  friendText: {
    fontSize: "16px",
    fontWeight: "500",
    margin: 0,
    color: "green",
  },
};
function UserItem({ user }) {
  const navigate = useNavigate();
  return user ? (
    <div
      style={styles.container}
      onClick={() => {
        console.log("user clicked", user?.id);
        navigate(`/${user?.id}`);
      }}
    >
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <ProfileImage />
        <div>
          <p style={styles.userNameText}>{user?.username}</p>
          <p style={styles.emailText}>{user?.email}</p>
        </div>
      </div>
      <div style={styles?.friendItem}>
        <p style={styles?.friendText}>Friend</p>
      </div>
    </div>
  ) : (
    <UserItemSkeleton />
  );
}
const skeletonStyles = {
  container: {
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    boxSizing: "border-box",
    // gap: 5,
    borderRadius: 5,
    padding: "5px 10px",
    // backgroundColor: "F2F2F2",
    boxShadow: "0 1px 5px 0 #e4e4e4",
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    backgroundColor: "#e4e4e4",
  },
  userNameText: {
    width: 100,
    height: 15,
    backgroundColor: "#e4e4e4",
  },
  emailText: {
    width: 150,
    height: 15,
    backgroundColor: "#e4e4e4",
  },
};

function UserItemSkeleton() {
  return (
    <div style={skeletonStyles.container}>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <div style={skeletonStyles.circle}></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <p style={skeletonStyles.userNameText}></p>
          <p style={skeletonStyles.emailText}></p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default UserItem;
