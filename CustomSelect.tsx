import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Select, useTheme } from "@mui/material";
import React from "react";
import CustomSelectInputField from "./CustomSelectInputField";

export interface CustomSelectProps {
  children?: React.ReactNode;
  [x: string]: any;
}

export default function CustomSelect({ children, ...props }: CustomSelectProps) {
  const theme = useTheme();

  return (
    <Select
      inputProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              border: "1px solid #ffffff00",
              marginTop: "-15px",
              background: theme.palette.background.default,
            },
          },
          MenuListProps: {
            sx: {
              px: 1.3,
              background: theme.palette.background.default,
              maxHeight: "30vh",
            },
          },
        },
      }}
      size="medium"
      IconComponent={KeyboardArrowDownIcon}
      input={<CustomSelectInputField />}
      SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
      sx={{
        "& .MuiSelect-select": {
          borderRadius: "4px",
          padding: "8px",
        },
      }}
      {...props}
    >
      {children}
    </Select>
  );
}
