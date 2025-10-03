import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Avatar } from "@mui/material";

const mockRanking = [
  { name: "Anna Berger", points: 350, avatar: "" },
  { name: "Tom Müller", points: 340, avatar: "" },
  { name: "Lena Schmidt", points: 335, avatar: "" },
  { name: "Max Fischer", points: 330, avatar: "" },
  { name: "Petra Klein", points: 325, avatar: "" },
];

const RankingPage: React.FC = () => {
  return (
    <>
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 2, pb: 10, pt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Ranking
        </Typography>

        <Paper elevation={2} sx={{ borderRadius: 4, p: 2 }}>
          <List>
            {mockRanking.map((item, idx) => (
              <ListItem key={item.name} disableGutters>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
                  <Avatar sx={{ width: 36, height: 36 }}>{idx + 1}</Avatar>
                  <ListItemText primary={item.name} />
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {item.points} pts
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* Platzhalter für evtl. lokale Aktionsleiste (bewusst leer gelassen) */}
      <Paper elevation={0} sx={{ display: "none" }} />
    </>
  );
};

export default RankingPage;
