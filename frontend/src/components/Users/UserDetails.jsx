import React from "react";
import ProfileImage from "../Profile/ProfileImage";
import Button from "../buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import { UserContext } from "../../App";

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
    fontSize: "16px",
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
  const [friendShip, setFriendShip] = React.useState(null);
  const [confirmation, setConfirmation] = React.useState(false);
  const fetchMainUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.fetchUser();
      if (response.status) {
        setUser(response.data);
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to fetch user data");
    }
    setLoading(false);
  };

  const fetchUserById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.fetchUserById(id);
      if (response.status) {
        setUser(response.data.user);
        setFriendShip(response.data.friendship);
        setLoading(false);
      } else {
        setError("No user found");
      }
    } catch (error) {
      setError("Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.addFriend(id);
      console.log(response);
      if (response.status) {
        setFriendShip(true);
        setLoading(false);
      }
    } catch (error) {
      setError("Failed to add friend");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.deleteAccount();
      if (response.status) {
        navigate("/");
      } else {
        setError("Failed to delete account");
      }
    } catch (error) {
      setError("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFriend = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await UserService.removeFriend(friendShip?.id);
      if (response.status) {
        setFriendShip(false);
        setLoading(false);
      } else {
        setError("Failed to remove friend");
      }
    } catch (error) {
      setError("Failed to remove friend");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setUser(null);
    if (isEditUser && !id) {
      fetchMainUser();
    } else if (!isEditUser && id) {
      fetchUserById();
    }
  }, [isEditUser, id]);

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
          {error && (
            <>
              <p style={styles.headText}>{error}</p>
              <Button onClick={fetchMainUser}>Retry</Button>
            </>
          )}
          {/* <p style={styles.headText}>{user?.username}</p> */}
          {!error && (
            <>
              <ProfileImage /> <p style={styles.emailText}>{user?.email}</p>
              <div style={{ display: "flex", gap: 5 }}>
                <Button onClick={() => navigate("/edit")}>Update</Button>
                <Button
                  backgroundColor="red"
                  onClick={() => setConfirmation(true)}
                >
                  Delete
                </Button>
              </div>
              {confirmation && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <p>Are you sure? you want to delete account</p>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Button onClick={() => setConfirmation(false)}>No</Button>
                    <Button backgroundColor="red" onClick={handleDeleteAccount}>
                      Yes
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {error && (
            <>
              <p style={styles.headText}>{error}</p>
              <Button onClick={fetchUserById}>Retry</Button>
            </>
          )}
          {!error && (
            <>
              <ProfileImage />
              <p style={styles.emailText}>{user?.email || user?.username}</p>
              <div style={{ display: "flex", gap: 5 }}>
                <Button
                  backgroundColor={friendShip ? "red" : undefined}
                  onClick={friendShip ? handleRemoveFriend : handleAddFriend}
                >
                  {friendShip ? "Remove Friend" : "Add as Friend"}
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default UserDetails;
