import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Select, useTheme } from "@mui/material";

import React from "react";
import BaseInputDropdown from "./BaseInputDropdown";

export interface RadioDropdownProps {
  children?: React.ReactNode;
  [x: string]: any;
  icon?: any;
}

export default function RadioDropdown({ icon, children, ...props }: RadioDropdownProps) {
  const theme = useTheme();

  return (
    <Select
      inputProps={{
        MenuProps: {
          PaperProps: {
            sx: {
              border: "1px solid #ffffff00",
              marginTop: "8px",
            },
          },
          MenuListProps: {
            sx: {
              px: 1.3,
              background: theme.palette.background.default,
            },
          },
        },
      }}
      size="medium"
      IconComponent={icon || KeyboardArrowDownIcon}
      input={<BaseInputDropdown />}
      sx={{
        "& .MuiSelect-select": {
          borderRadius: "4px",
          pl: "10px",
          color: theme.palette.text.titleLabel,
          fontSize: "16px",
          fontWeight: "600",
          background: theme.palette.dashboardContainer.customRadioDropdownBackground,
          boxShadow: theme.palette.dashboardContainer.customRadioDropdownBoxShadow,
        },
      }}
      {...props}
    >
      {children}
    </Select>
  );
}
