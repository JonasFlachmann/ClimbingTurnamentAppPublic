</Box> {/* Ende von maxWidth-Box */}

    {/* Footer identisch zu home.tsx */}
    <Box
      component="footer"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        py: 1,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      {/* Footer Buttons hier … */}
    </Box>
  </Box> {/* <- das hat gefehlt! */}
);