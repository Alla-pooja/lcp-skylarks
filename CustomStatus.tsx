import { Button, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export interface statusProps {
  label: string;
  status: string;
  sx?: SxProps<Theme>;
}

export default function CustomStatus({ label, status, sx }: statusProps) {
  const theme = useTheme();

  let statusStyle: React.CSSProperties = {};

  switch (status) {
    case "high":
      statusStyle = {
        background: theme.palette.dashboardContainer.highStatusBg,
        color: theme.palette.text.highStatus,
        border: `1px solid ${theme.palette.text.highStatus}`,
      };
      break;
    case "neutral":
      statusStyle = {
        background: theme.palette.dashboardContainer.neutralStatusBg,
        color: theme.palette.text.neutralStatus,
        border: `1px solid ${theme.palette.text.neutralStatus}`,
      };
      break;
    case "moderate":
      statusStyle = {
        background: theme.palette.dashboardContainer.moderateStatusBg,
        color: theme.palette.text.moderateStatus,
        border: `1px solid ${theme.palette.text.moderateStatus}`,
      };
      break;
    case "extreme":
      statusStyle = {
        background: theme.palette.dashboardContainer.extremeStatusBg,
        color: theme.palette.text.extremeStatus,
        border: `1px solid ${theme.palette.text.extremeStatus}`,
      };
      break;
    case "low":
      statusStyle = {
        background: theme.palette.dashboardContainer.lightBgButton,
        color: theme.palette.text.lowStatus,
        border: `1px solid ${theme.palette.text.lowStatus}`,
      };
      break;
    case "default":
      break;
  }

  return (
    <Button
      sx={{
        ...statusStyle,
        textTransform: "capitalize",
        ...sx,
      }}
    >
      {label}
    </Button>
  );
}
