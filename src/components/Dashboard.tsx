import React from "react";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";

interface DashboardProps {
  userType: string;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardProps> = ({ userType, children }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{userType.toUpperCase()} Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </Box>
  );
};

export default DashboardLayout;
