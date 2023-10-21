import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import request from "../request";

export default function Com() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    window.localStorage.removeItem("token");
    navigate("/signIn");
  };
  return (
    <Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography
              onClick={() => {
                navigate("/");
              }}
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: 25,
                  marginRight: 5,
                }}
                src={logo}
              />
              <span style={{
                position: 'relative',
                top: 2
              }}>IOT</span>
            </Typography>
            <Button onClick={handleLogout} color="error">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        sx={{
          mt: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
