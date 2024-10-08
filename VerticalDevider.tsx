import { Divider, useTheme } from "@mui/material";

const VerticalDivider = () => {
  const theme = useTheme();

  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        boxShadow: theme.palette.dashboardContainer.verticalDividerBoxShadow,
        backgroundColor: theme.palette.dashboardContainer.verticalDividerColor,
        width: "3px",
        height: "28px",
        mt: "5px",
        mx: "5px",
      }}
    />
  );
};

export default VerticalDivider;
