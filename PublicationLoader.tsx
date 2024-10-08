import { useTheme } from "@mui/material";
import ContentLoader from "react-content-loader";

export default function PublicationLoader() {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={3}
      width={"100%"}
      height={256}
      style={{ width: "100%" }}
      viewBox="0 0 450 256"
      backgroundColor={theme.palette.background.loaderLineColor}
      foregroundColor={theme.palette.background.loaderBgColor}
    >
      <rect x="48" y="8" rx="3" ry="3" width="131" height="12" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="8" />
      <rect x="0" y="88" rx="3" ry="3" width="450" height="8" />
      <rect x="0" y="108" rx="3" ry="3" width="380" height="8" />
      <rect x="0" y="128" rx="3" ry="3" width="350" height="8" />
      <rect x="0" y="148" rx="3" ry="3" width="300" height="8" />
      <rect x="350" y="220" rx="8" ry="8" width="100" height="28" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  );
}
