import { Button, ButtonProps } from "@mui/material";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import React from "react";

interface CustomTertiaryButtonProps extends ButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

export default function CustomTertiaryButton({ children, sx, ...props }: CustomTertiaryButtonProps) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      disableRipple
      sx={{
        border: theme.palette.dashboardContainer.buttonBorder,
        color: theme.palette.primary.main,
        background: theme.palette.background.tertiaryDarkGradient,
        boxShadow: theme.palette.dashboardContainer.outsetBoxShadow,
        borderRadius: "4px",
        "&:hover": {
          background: theme.palette.background.tertiaryGradient,
          boxShadow: theme.palette.dashboardContainer.outsetBoxShadow,
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        "&:active": {
          background: theme.palette.background.gradientLight1,
          boxShadow: "0px 0px 2px 0px #12161D, 0px 0px 1px 0px rgba(48, 62, 90, 0.55)",
          color: theme.palette.text.active,
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        "&.Mui-disabled": {
          background: theme.palette.action.disabled,
          color: theme.palette.background.dark,
          border: "none",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
