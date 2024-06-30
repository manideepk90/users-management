import React, { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";

function App() {
  const [app, setApp] = useState(0);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
