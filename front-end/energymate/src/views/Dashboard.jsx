import {
  Container,
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import request from "../request";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmptyState from "../components/Empty";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import sty from "./Dashboard.module.css";

export default function Com() {
  const [timeUnit, setTimeUit] = useState("min");
  const [listData, setListData] = useState([
    {
      time: "12:00",
      value: 150,
    },
    {
      time: "13:00",
      value: 50,
    },
    {
      time: "14:00",
      value: 120,
    },
    {
      time: "15:00",
      value: 130,
    },
    {
      time: "16:00",
      value: 110,
    },
    {
      time: "17:00",
      value: 350,
    },
  ]);
  const [num, setNum] = useState("");
  const handleSearch = async () => {
    // if (!num) {
    //   alert("Time cannot be empty!");
    //   return;
    // }
    // await request({
    //   url: "/admin/quiz/new",
    //   method: "POST",
    //   data: {
    //     num,
    //   },
    // });
    // setNum("");
    // getListData();
  };

  const getListData = async () => {};

  useEffect(() => {
    // getListData();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item container>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                mb: 4,
              }}
            >
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between" alignItems="center">
              <TextField
                required
                label="Number"
                size="small"
                sx={{
                  flex: 1,
                }}
                type="number"
                variant="outlined"
                value={num}
                onChange={(e) => {
                  setNum(e.target.value);
                }}
              />
              <FormControl
                sx={{
                  flex: 1,
                  ml: 1,
                }}
              >
                <InputLabel required size="small" id="demo-simple-select-label">
                  Time Unit
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeUnit}
                  label="Time Unit"
                  onChange={(e) => {
                    setTimeUit(e.target.value);
                  }}
                >
                  <MenuItem value="min">min</MenuItem>
                  <MenuItem value="hours">hours</MenuItem>
                  <MenuItem value="days">days</MenuItem>
                  <MenuItem value="weeks">weeks</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" sx={{ ml: 1 }} onClick={handleSearch}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          mb: 4,
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell align="right">Numerical Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.map((row) => (
                <TableRow
                  key={row.time}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.time}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {listData.length === 0 && <EmptyState />}
        <div className={sty.navBox}>
          <div className={sty.navItem}>
            <div className={sty.navItemLabel}>Energy consumption</div>
            <div className={sty.navItemValue}>120 W</div>
          </div>
          <div className={sty.navItem}>
            <div className={sty.navItemLabel}>Money spent</div>
            <div className={sty.navItemValue}>220 $</div>
          </div>
        </div>
        <Typography
          component="h5"
          variant="h5"
          sx={{
            textAlign: "center",
          }}
        >
          Money saving suggestions
        </Typography>
        <List sx={{ bgcolor: "background.paper" }}>
          <ListItem alignItems="flex-start">
            <ListItemText primary="You can turn off AC by 4 hours, in result you can save 5$ this month!" />
          </ListItem>
          {/* <Divider sx={{
            marginLeft: 0
          }} variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText primary="You can turn off AC by 4 hours, in result you can save 5$ this month!" />
          </ListItem> */}
        </List>
      </Box>
    </Container>
  );
}
