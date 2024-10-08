import { useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { SxProps, Theme } from "@mui/material/styles";

export interface CustomDividerProps {
  orientation?: "horizontal" | "vertical";
  isVisibile?: boolean;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

export default function CustomDivider({ orientation = "horizontal", isVisible = true, sx, ...rest }: CustomDividerProps) {
  const theme = useTheme();

  return (
    <Divider
      orientation={orientation}
      sx={{
        margin: "0 auto !important",
        border: isVisible ? theme.palette.dashboardContainer.customDividerBorder : "none",
        boxShadow: theme.palette.dashboardContainer.customDividerBoxShadow,
        ...sx,
      }}
      {...rest}
    />
  );
}
