import { Button, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export interface RoundedButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

export default function RoundedButton({ children, sx, ...rest }: RoundedButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      disableRipple
      sx={{
        backgroundColor: theme.palette.background.dark,
        borderRadius: 4,
        py: 0.5,
        border: `2px solid ${theme.palette.additionalColors.border}`,
        color: theme.palette.primary.light,
        fontWeight: "600",
        flex: "none",
        "&:hover": {
          backgroundColor: theme.palette.background.dark,
          color: theme.palette.primary.light,
        },
        "&:disabled": {
          color: theme.palette.primary.baseDisabled,
          background: theme.palette.background.paper,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
