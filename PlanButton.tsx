import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import React from "react";

export interface PlanButtonProps extends BoxProps {
  type: "basic" | "pro" | "enterprise";
}

export default function PlanButton({ children, type, ...rest }: PlanButtonProps) {
  const theme = useTheme();
  const [backgroundColor, setBackgroundColor] = React.useState<string>();

  React.useEffect(() => {
    if (type === "basic") {
      setBackgroundColor(theme.palette.toggle.baseDisabled);
    } else if (type === "pro") {
      setBackgroundColor(theme.palette.text.highStatus);
    } else if (type === "enterprise") {
      setBackgroundColor(theme.palette.text.neutralStatus);
    }
  }, []);

  return (
    <Box sx={{ width: "fit-content", borderRadius: 1, p: "4px 16px", background: backgroundColor || theme.palette.toggle.baseDisabled }}>
      <Typography variant="h2" color={theme.palette.text.titleLabel}>
        {children}
      </Typography>
    </Box>
  );
}
