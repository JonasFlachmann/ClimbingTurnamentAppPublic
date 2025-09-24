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
import { glass } from "../styles/theme";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <Box sx={{ pb: 7 }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={(theme) => ({
          ...glass(0.9)(theme),
          color: theme.palette.getContrastText(theme.palette.success.main),
        })}
      >
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

          {/* Titel zentriert */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title ?? "Boulder App"}
          </Typography>

          {/* Settings rechts */}
          <IconButton color="inherit" aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: (theme) => ({
            ...glass(0.9)(theme),
            color: theme.palette.getContrastText(theme.palette.success.main),
          }),
        }}
      >
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
        sx={(theme) => ({
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          ...glass(0.9)(theme),
          borderTop: "1px solid rgba(0,0,0,0.12)",
        })}
        elevation={8}
      >
        <BottomNavigation
          sx={(theme) => ({
            background: "transparent",
            "& .MuiBottomNavigationAction-root": {
              color: theme.palette.getContrastText(theme.palette.success.main),
            },
            "& .Mui-selected": {
              color: theme.palette.common.white,
            },
          })}
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
