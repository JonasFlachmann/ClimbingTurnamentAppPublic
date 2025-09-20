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
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import MapIcon from "@mui/icons-material/Map";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ pb: 7 }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "green" }}>
        <Toolbar>
          {/* Menü-Button links */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Titel */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title || "Climbing App"}
          </Typography>

          {/* Neuer UF-Button */}
          <Link href="/user-flow" passHref>
            <Button
              variant="contained"
              sx={{
                minWidth: "40px",
                minHeight: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: "green",
                fontWeight: "bold",
                mr: 1,
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              UF
            </Button>
          </Link>

          {/* Settings-Icon bleibt */}
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Navigation */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button component={Link} href="/home">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} href="/tournament-create">
              <ListItemText primary="Turnier erstellen" />
            </ListItem>
            <ListItem button component={Link} href="/boulder-add">
              <ListItemText primary="Boulder hinzufügen" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} href="/results">
              <ListItemText primary="Ergebnisse" />
            </ListItem>
            <ListItem button component={Link} href="/ranking">
              <ListItemText primary="Ranking" />
            </ListItem>
            <ListItem button component={Link} href="/map">
              <ListItemText primary="Karte" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Seiteninhalt */}
      <Box component="main" sx={{ p: 2 }}>
        {children}
      </Box>

      {/* Bottom Navigation */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            component={Link}
            href="/home"
          />
          <BottomNavigationAction
            label="Karte"
            icon={<MapIcon />}
            component={Link}
            href="/map"
          />
          <BottomNavigationAction
            label="Turniere"
            icon={<EventIcon />}
            component={Link}
            href="/tournament-overview"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
