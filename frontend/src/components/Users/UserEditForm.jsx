import React from "react";
import ProfileImage from "../Profile/ProfileImage";
import Button from "../buttons/Button";
import InputField from "../Inputs/InputField";
import { useNavigate } from "react-router-dom";

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

function UserEditForm({ user = { username: "manideep" } }) {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <>
        <ProfileImage />
        <InputField label="Username/Email Id" />
        <InputField label="Password" />
        <InputField label="Confirm Password" />
        <div style={{ display: "flex", gap: 5 }}>
          <Button>Save</Button>
          <Button backgroundColor="red" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </>
    </div>
  );
}
export default UserEditForm;
