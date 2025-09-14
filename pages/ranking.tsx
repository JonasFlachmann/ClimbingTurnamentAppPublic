import React from "react";
import { Box, Typography, Paper, BottomNavigation, BottomNavigationAction, List, ListItem, ListItemText, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Link from "next/link";

const mockRanking = [
  { name: "Anna Berger", points: 350, avatar: "" },
  { name: "Tom Müller", points: 340, avatar: "" },
  { name: "Lena Schmidt", points: 335, avatar: "" },
  { name: "Max Fischer", points: 330, avatar: "" },
  { name: "Petra Klein", points: 325, avatar: "" },
];

const RankingPage: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Ranking
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Die besten Boulder:innen der Saison
        </Typography>
        <Paper elevation={2} sx={{ borderRadius: 4, p: 2, mb: 4 }}>
          <List>
            {mockRanking.map((r, idx) => (
              <ListItem key={r.name} sx={{ mb: 1, borderRadius: 2, bgcolor: idx === 0 ? "primary.light" : "background.paper", boxShadow: idx === 0 ? 2 : 0 }}>
                <Avatar sx={{ bgcolor: idx === 0 ? "primary.main" : "grey.400", mr: 2 }}>
                  {idx === 0 ? <EmojiEventsIcon /> : r.name[0]}
                </Avatar>
                <ListItemText
                  primary={r.name}
                  secondary={`Punkte: ${r.points}`}
                  primaryTypographyProps={{
                    fontWeight: idx === 0 ? "bold" : "normal",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={(_, newValue) => setValue(newValue)}>
          <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} href="/home" />
          <BottomNavigationAction label="Karte" icon={<MapIcon />} component={Link} href="/map" />
          <BottomNavigationAction label="Turniere" icon={<SportsHandballIcon />} component={Link} href="/tournament-overview" />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default RankingPage;
