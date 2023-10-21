import React from "react";
import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedSharpIcon from "@mui/icons-material/SentimentDissatisfiedSharp";

export default function EmptyState({
  label = 'No Data'
}) {
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SentimentDissatisfiedSharpIcon
        sx={{
          color: "#999",
          fontSize: 50,
        }}
      />
      <Typography
        sx={{
          color: "#999",
          fontSize: 20,
        }}
        variant="div"
        gutterBottom
      >
        {label}
      </Typography>
    </Box>
  );
}
