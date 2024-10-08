import { Button, ButtonProps, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export interface CustomIconButtonProps extends ButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

export default function CustomIconButton({ children, sx, ...rest }: CustomIconButtonProps) {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      disableRipple
      sx={{
        border: `0.5px solid ${theme.palette.additionalColors.lightBorder}`,
        background: theme.palette.dashboardContainer.closeButtonColor,
        boxShadow: theme.palette.dashboardContainer.closeButtonBoxShadow,
        borderRadius: "3px",
        minWidth: (theme) => theme.spacing(3),
        width: (theme) => theme.spacing(3),
        height: (theme) => theme.spacing(3),
        padding: "6px",
        color: theme.palette.text.main,
        "&:hover": {
          background: theme.palette.dashboardContainer.closeButtonColor,
          boxShadow: theme.palette.dashboardContainer.customButtonActiveBoxShadow,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
