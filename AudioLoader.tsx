import { useTheme } from "@mui/material";
import ContentLoader from "react-content-loader";

export default function AudioLoader() {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={3}
      width={400}
      height={200}
      style={{ width: "100%" }}
      backgroundColor={theme.palette.background.loaderLineColor}
      foregroundColor={theme.palette.background.loaderBgColor}
    >
      <rect x="74" y="8" rx="3" ry="3" width="131" height="12" />
      <rect x="74" y="30" rx="3" ry="3" width="65" height="8" />
      <rect x="0" y="88" rx="8" ry="8" width="100%" height="34" />
      <rect x="400" y="160" rx="8" ry="8" width="100" height="28" />
      <rect x="0" y="165" rx="8" ry="8" width="150" height="8" />
      <rect x="0" y="180" rx="8" ry="8" width="150" height="8" />
      <circle cx="30" cy="30" r="30" />
    </ContentLoader>
  );
}
