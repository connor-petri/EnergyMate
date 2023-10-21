import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Auth from "./components/Auth";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Layout />
            </Auth>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
