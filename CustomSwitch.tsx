import { Switch, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

interface CustomIconProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  [x: string]: any;
}
export default function CustomSwitch({ children, sx, ...props }: CustomIconProps) {
  const theme = useTheme();
  return (
    <Switch
      sx={{
        width: "50px",
        height: "34px",
        "& .MuiSwitch-thumb": {
          width: 13,
          height: 13,
          mt: "1px",
          boxShadow: theme.palette.dashboardContainer.customSwitchThumbShadow,
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: theme.palette.text.default,
        },
        "& .MuiSwitch-switchBase": {
          color: theme.palette.text.tableHeader,
        },
        "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
          background: theme.palette.text.default,
          boxShadow: theme.palette.dashboardContainer.customActiveSwitchShadow,
        },

        "& .MuiSwitch-track": {
          opacity: 1,
          background: theme.palette.background.dark,
          boxShadow: theme.palette.dashboardContainer.customSwitchBoxShadow,
          borderRadius: "20px",
        },
        "&.Mui-checked": {
          "& + .MuiSwitch-track": {
            background: theme.palette.toggle.baseDisabled,
            borderRadius: "20px",
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
}
