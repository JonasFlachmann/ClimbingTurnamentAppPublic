import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navValue, setNavValue] = useState(0);

  const toggleDrawer = (state: boolean) => () => {
    setDrawerOpen(state);
  };

  return (
    <Box sx={{ pb: 7 }}>
      {/* Header */}
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title || "Climbing App"}
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            top: (theme) => theme.mixins.toolbar.minHeight, // Start direkt unter Header
          },
        }}
      >
        <Box>
          <List>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Account-Informationen" />
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Einstellungen" />
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Contact Us" />
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Impressum" />
            </ListItem>
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemText primary="Unterstützen" />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Page Content */}
      <Box component="main" sx={{ pt: 8, pb: 7 }}>
        {children}
      </Box>

      {/* Footer */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          value={navValue}
          onChange={(event, newValue) => setNavValue(newValue)}
          showLabels
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Turniere" icon={<EventIcon />} />
          <BottomNavigationAction label="Erstellen" icon={<AddCircleIcon />} />
          <BottomNavigationAction label="Info" icon={<InfoIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
