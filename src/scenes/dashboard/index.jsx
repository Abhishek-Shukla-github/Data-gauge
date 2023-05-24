import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      {/* <Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box> */}
    </Box>
    </Box>
  )
}

export default Dashboard;