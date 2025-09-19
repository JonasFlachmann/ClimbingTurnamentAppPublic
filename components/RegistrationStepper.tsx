import * as React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";

type Props = {
  activeStep: number; // 0..3
  labels?: [string, string, string, string];
};

const DEFAULT_LABELS: [string, string, string, string] = [
  "Persönliche Daten",
  "E-Mail bestätigen",
  "Teilnahmebedingungen",
  "Abschluss",
];

export default function RegistrationStepper({ activeStep, labels = DEFAULT_LABELS }: Props) {
  return (
    <Box sx={{ px: { xs: 1, sm: 2 }, py: 1 }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{
          width: "100%",
          overflowX: "auto",
          "& .MuiStepLabel-label": { whiteSpace: "nowrap", fontSize: { xs: 12, sm: 14 } },
        }}
      >
        {labels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
