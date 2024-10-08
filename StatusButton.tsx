import { Button, useTheme } from "@mui/material";

export interface StatusButtonProps {
  status: "active" | "inactive" | "pending" | "deactivated";
}

export default function StatusButton({ status }: StatusButtonProps) {
  const theme = useTheme();

  if (status === "active") {
    return (
      <Button
        variant="contained"
        sx={{
          display: "flex",
          px: 0.25,
          py: 0.25,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100px",
          background: theme.palette.background.success,
          border: (theme) => `1px solid ${theme.palette.success.status}`,
          color: (theme) => theme.palette.success.status,
          "&:hover": {
            background: theme.palette.background.success,
            boxShadow: theme.palette.dashboardContainer.customButtonBoxShadow,
          },
          "&:active": {
            background: theme.palette.background.success,
            boxShadow: theme.palette.dashboardContainer.customButtonActiveBoxShadow,
          },
          "&:disabled": {
            background: theme.palette.action.disabled,
            color: theme.palette.background.dark,
          },
        }}
      >
        Active
      </Button>
    );
  } else if (status === "deactivated" || status === "inactive") {
    return (
      <Button
        variant="contained"
        sx={{
          display: "flex",
          px: 0.25,
          py: 0.25,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100px",
          background: theme.palette.button.disabledButton.background,
          border: (theme) => `1px solid ${theme.palette.dashboardContainer.unactiveStatusButtonTextColor}`,
          color: (theme) => theme.palette.dashboardContainer.unactiveStatusButtonTextColor,
          cursor: "pointer",
          "&:hover": {
            background: theme.palette.button.disabledButton.background,
            boxShadow: theme.palette.dashboardContainer.customButtonBoxShadow,
          },
          "&:active": {
            background: theme.palette.button.disabledButton.background,
            boxShadow: theme.palette.dashboardContainer.customButtonActiveBoxShadow,
          },
          "&:disabled": {
            background: theme.palette.action.disabled,
            color: theme.palette.background.dark,
          },
        }}
      >
        Unactive
      </Button>
    );
  } else if (status === "pending") {
    return (
      <Button
        variant="contained"
        sx={{
          display: "flex",
          px: 0.25,
          py: 0.25,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100px",
          background: theme.palette.dashboardContainer.customPendingButtonBackground,
          border: "1px solid #F17742",
          color: "#F17742",
          cursor: "pointer",
          "&:hover": {
            background: theme.palette.dashboardContainer.customPendingButtonBackground,
            boxShadow: theme.palette.dashboardContainer.customButtonBoxShadow,
          },
          "&:active": {
            background: theme.palette.dashboardContainer.customPendingButtonBackground,
            boxShadow: theme.palette.dashboardContainer.customButtonActiveBoxShadow,
          },
          "&:disabled": {
            background: theme.palette.action.disabled,
            color: theme.palette.background.dark,
          },
        }}
      >
        Pending
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        sx={{
          display: "flex",
          px: 0.25,
          py: 0.25,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100px",
          background: theme.palette.dashboardContainer.customPendingButtonBackground,
          border: "1px solid #F17742",
          "&:hover": {
            background: theme.palette.dashboardContainer.customPendingButtonBackground,
            boxShadow: theme.palette.dashboardContainer.customButtonBoxShadow,
          },
          "&:active": {
            background: theme.palette.dashboardContainer.customPendingButtonBackground,
            boxShadow: theme.palette.dashboardContainer.customButtonActiveBoxShadow,
          },
          "&:disabled": {
            background: theme.palette.action.disabled,
            color: theme.palette.background.dark,
          },
        }}
      >
        Unknown
      </Button>
    );
  }
}
