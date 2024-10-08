import { MenuItem, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import CustomDivider from "./CustomDivider";

export interface CustomSelectMenuItemProps {
  children?: React.ReactNode;
  sx: SxProps<Theme>;
  [x: string]: any;
}

export default function CustomSelectMenuItem({ children, sx, ...props }: CustomSelectMenuItemProps) {
  const theme = useTheme();
  return (
    <>
      <MenuItem
        {...props}
        style={{ backgroundColor: "transparent", textTransform: "capitalize", fontSize: "14px", fontWeight: 400 }}
        sx={{
          ...sx,
          marginLeft: "auto",
          fontSize: "14px",
          fontWeight: "400",
          "& .MuiSvgIcon-root": {
            fill: props.selected ? theme.palette.checkbox.default : theme.palette.checkbox.darkBorder,
          },
          "& .MuiButtonBase-root.MuiCheckbox-root": {
            pl: "5px",
          },
          "&:hover .MuiSvgIcon-root": {
            fill: (theme) =>
              props.selected ? theme.palette.checkbox.default : "linear-gradient(135deg, rgba(38, 46, 63, 0.70) 0%, rgba(29, 35, 48, 0.70) 100%)",
            stroke: props.selected ? "none" : theme.palette.checkbox.darkBorder,
          },
          "&:active .MuiSvgIcon-root": {
            fill: props.selected ? "#245785" : theme.palette.checkbox.darkBorder,
          },
        }}
      >
        {children}
      </MenuItem>
      <CustomDivider />
    </>
  );
}
