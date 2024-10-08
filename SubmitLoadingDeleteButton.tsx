import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import React from "react";

export interface SubmitLoadingDeleteButtonProps extends ButtonProps {
  sx?: SxProps<Theme>;
  children?: React.ReactNode;
  isLoading: boolean;
  [x: string]: any;
}

export default function SubmitLoadingDeleteButton({ sx, children, isLoading = false, ...rest }: SubmitLoadingDeleteButtonProps) {
  const theme = useTheme();

  return (
    <Button
      type="submit"
      disabled={isLoading}
      variant="contained"
      disableRipple
      sx={{
        fontWeight: "bold",
        border: theme.palette.dashboardContainer.buttonBorder,
        color: theme.palette.text.titleLabel,
        borderRadius: "4px",
        background: theme.palette.error.text,
        boxShadow: "4px 4px 6px 0px rgba(0, 0, 0, 0.25), -3px -3px 8px 0px #2E3D53",
        transform: "rotate(0.13deg)",
        "&:hover": {
          background: theme.palette.error.hover,
          boxShadow: "4px 4px 6px 0px rgba(0, 0, 0, 0.25), -3px -3px 8px 0px #2E3D53",
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        "&:active": {
          border: theme.palette.dashboardContainer.buttonBorder,
          background: theme.palette.error.active,
          boxShadow: "0px 2px 4px 0px rgba(1, 19, 35, 0.30) inset",
        },
        "&.Mui-disabled": {
          background: theme.palette.action.disabled,
          color: theme.palette.background.dark,
          boxShadow: "0px 2px 4px 0px rgba(1, 19, 35, 0.30) inset",
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        ...sx,
      }}
      {...rest}
    >
      {children} {isLoading && <CircularProgress color="inherit" size={16} sx={{ ml: 1 }} />}
    </Button>
  );
}
