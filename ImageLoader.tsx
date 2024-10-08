import { useMediaQuery, useTheme } from "@mui/material";
import ContentLoader from "react-content-loader";

export default function ImageLoader() {
  const theme = useTheme();

  let matches = "70%";
  if (useMediaQuery(theme.breakpoints.up("xl"))) {
    matches = "78%";
  }
  if (useMediaQuery(theme.breakpoints.down("lg"))) {
    matches = "66%";
  }
  if (useMediaQuery(theme.breakpoints.down("sm"))) {
    matches = "78%";
  }

  return (
    <ContentLoader
      speed={3}
      width={"100%"}
      height={260}
      style={{ width: "100%" }}
      backgroundColor={theme.palette.background.loaderLineColor}
      foregroundColor={theme.palette.background.loaderBgColor}
      title=""
    >
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="200" />
      <rect x={matches} y="220" rx="8" ry="8" width="100" height="28" />
      <rect x="20" y="220" rx="8" ry="8" width="150" height="8" />
      <rect x="20" y="235" rx="8" ry="8" width="150" height="8" />
    </ContentLoader>
  );
}
