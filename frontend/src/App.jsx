import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import UserService from "./services/UserService";
import AuthService from "./services/AuthService";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const fetchMainUser = async () => {
    try {
      const response = await UserService.fetchUser();
      if (response.status) {
        setUser(response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("Unauthorized");
        AuthService.logout();
      }
    }
  };
  useEffect(() => {
    fetchMainUser();
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
