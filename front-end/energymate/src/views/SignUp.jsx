import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import request from "../request";
import { useNavigate } from "react-router-dom";

export default function Com() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleEnter = async (event) => {
    event.preventDefault();
    navigate("/");
    if (!username) {
      alert("Please enter username!");
      return;
    }
    if (!password) {
      alert("Please enter username!");
      return;
    }
    // const { token } = await request({
    //   url: "/api/register",
    //   method: "POST",
    //   data: {
    //     username,
    //     password,
    //   },
    // });
    // window.localStorage.setItem("token", token);
    navigate("/");
  };
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      maxWidth="xs"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleEnter} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            aria-describedby="Username"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            aria-describedby="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            component="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            Sign In
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link aria-label="Go to Sign In" href="/signIn" variant="button">
              Go to Sign In
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
