import { Button, ButtonProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export interface CustomTextButtonProps extends ButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

export default function CustomTextButton({ children, sx, ...rest }: CustomTextButtonProps) {
  return (
    <Button
      disableRipple
      variant="text"
      sx={{
        p: 0,
        minWidth: "fit-content",
        background: "none",
        "&:hover": {
          background: "none",
          boxShadow: "none",
        },
        "&:active": {
          background: "none",
          boxShadow: "none",
        },
        "&.Mui-disabled": {
          background: "none",
          boxShadow: "none",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
