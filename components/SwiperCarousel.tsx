import React from "react";
import { useTheme } from "@mui/material/styles";
import { alpha, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// Nutzung:
// <SwiperCarousel items={[<img .../>, <img .../>]} />

type Props = {
  items: React.ReactNode[];
  slideStyle?: React.CSSProperties;
  height?: number;
};

export default function SwiperCarousel({
  items,
  slideStyle,
  height = 220,
}: Props) {
  const theme = useTheme();
  return (
    <Box sx={{ position: "relative" }}>
      <Swiper modules={[Pagination]} pagination={{ clickable: true }} style={{ height }}>
        {items.map((node, idx) => (
          <SwiperSlide key={idx}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: alpha(theme.palette.background.paper, 0.6),
                borderRadius: 2,
                overflow: "hidden",
              }}
              style={slideStyle}
            >
              {node}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
