import { Button, ButtonProps } from "@mui/material";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

// Use this button only for buttons which require different styles, For common buttons use PrimaryLoadingButton, CustomSecondaryButton and CustomTertiaryButton
export default function CustomButton({ children, sx, ...props }: CustomButtonProps) {
  const theme = useTheme();

  return (
    <Button
      {...props}
      disableRipple
      sx={{
        bordeRadius: "4px",
        border: theme.palette.dashboardContainer.buttonBorder,
        background: theme.palette.background.tertiaryDarkGradient,
        boxShadow: theme.palette.dashboardContainer.outsetBoxShadow,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
