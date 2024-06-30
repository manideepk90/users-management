import React from "react";
import ProfileImage from "../Profile/ProfileImage";
import Button from "../buttons/Button";
import { useNavigate, useParams } from "react-router-dom";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "10px",
    boxSizing: "border-box",
    maxHeight: "calc(100vh - 200px)",
  },
  headText: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
  },
  emailText: {
    fontSize: "16px",
    fontWeight: "500",
    margin: 0,
  },
};

const skeletonStyles = {
  circle: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: "lightgray",
    margin: "10px 0",
  },
  username: {
    width: "80px",
    height: "15px",
    backgroundColor: "lightgray",
  },
  email: {
    width: "130px",
    height: "15px",
    backgroundColor: "lightgray",
  },
  button: {
    width: "100px",
    height: "30px",
    backgroundColor: "lightgray",
    borderRadius: "5px",
  },
};

function UserDetails({ none = false, isEditUser = false }) {
  const id = useParams()?.id;
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState(null);
  return (
    <div style={styles.container}>
      {none ? (
        <>
          <h1>User Details</h1>
          <p style={styles.headText}>Select User to show details</p>
        </>
      ) : loading ? (
        <>
          <div style={skeletonStyles.circle} />
          <div style={skeletonStyles.username}></div>
          <div style={skeletonStyles.email}></div>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={skeletonStyles.button}></div>
            <div style={skeletonStyles.button}></div>
          </div>
        </>
      ) : isEditUser ? (
        <>
          <ProfileImage />
          <p style={styles.headText}>Manideep</p>
          <p style={styles.emailText}>manideep</p>
          <div style={{ display: "flex", gap: 5 }}>
            <Button onClick={() => navigate("/edit")}>Update</Button>
            <Button backgroundColor="red">Delete</Button>
          </div>
        </>
      ) : (
        <>
          <ProfileImage />
          <p style={styles.headText}>Manideep</p>
          <p style={styles.emailText}>manideep</p>
          <div style={{ display: "flex", gap: 5 }}>
            <Button backgroundColor="red">Remove Friend</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
