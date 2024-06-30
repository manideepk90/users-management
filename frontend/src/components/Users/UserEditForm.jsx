import React, { useEffect, useState } from "react";
import ProfileImage from "../Profile/ProfileImage";
import Button from "../buttons/Button";
import InputField from "../Inputs/InputField";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import UserService from "../../services/UserService";

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

function UserEditForm() {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [email, setEmail] = useState(user?.email || "");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleUpdateUser = async () => {
    setError(null);
    setSuccess(false);
    try {
      setLoading(true);
      const response = await UserService.updateUser({
        email,
        // password,
        // confirm_password: confirmPassword,
      });
      if (response.status) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEmail(user?.email || "");
  }, [user]);

  return (
    <div>
      <>
        <form
          style={styles.container}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {error && <p style={{ color: "red" }}>{error}</p>}
          {/* <ProfileImage /> */}
          <InputField
            label="Username/Email Id"
            value={email}
            handleOnChange={setEmail}
          />
          {/* <InputField
            label="Password"
            value={password}
            inputProps={{
              type: "password",
            }}
            handleOnChange={setPassword}
          />
          <InputField
            label="Confirm Password"
            inputProps={{
              type: "password",
            }}
            value={confirmPassword}
            handleOnChange={setConfirmPassword}
          /> */}
          <div style={{ display: "flex", gap: 5 }}>
            <Button disabled={loading} onClick={handleUpdateUser}>
              Save
            </Button>
            <Button
              disabled={loading}
              backgroundColor="red"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>
              Success. redirecting to login page use new credentials
            </p>
          )}
        </form>
      </>
    </div>
  );
}
export default UserEditForm;
