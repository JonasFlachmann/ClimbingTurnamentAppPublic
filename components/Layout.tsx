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
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";
import { useRouter } from "next/router";
import { glass } from "../styles/theme";

// Zentrale Navigation importieren
import { BOTTOM_NAV, DRAWER_PRIMARY, DRAWER_SECONDARY } from "../lib/navigation";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const router = useRouter();

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

  // Aktiven Tab anhand der aktuellen Route bestimmen
  const currentIndex = BOTTOM_NAV.findIndex((n) => router.pathname.startsWith(n.href));
  const bottomValue = currentIndex >= 0 ? currentIndex : value;

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
            {DRAWER_PRIMARY.map((item) => (
              <ListItem button key={item.href} component={Link} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {DRAWER_SECONDARY.map((item) => (
              <ListItem button key={item.href} component={Link} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
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
          value={bottomValue}
          onChange={(_, newIndex) => {
            setValue(newIndex);
            const target = BOTTOM_NAV[newIndex];
            if (target) router.push(target.href);
          }}
          showLabels
        >
          {BOTTOM_NAV.map((item) => (
            <BottomNavigationAction
              key={item.href}
              label={item.label}
              icon={item.icon ? <item.icon /> : undefined}
              component={Link}
              href={item.href}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
