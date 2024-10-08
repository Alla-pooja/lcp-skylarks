import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ThemeVariantsProps } from "../theme";

export interface SkyLarkResponsiveLogoProps {
  showPrivacyButtons?: boolean;
  showLogo?: boolean;
}

const SkyLarkResponsiveLogo = ({ showPrivacyButtons = false, showLogo = false }: SkyLarkResponsiveLogoProps) => {
  const { themeMode } = useAppSelector((state) => state.theme);
  const isDarkTheme: boolean = themeMode === ThemeVariantsProps.dark;

  return (
    <>
      {showLogo && (
        <Box
          mb={10}
          sx={{
            display: {
              xs: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              padding: "10px",
              md: "none",
            },
          }}
          width={{ xs: "100%", sm: "80%" }}
          mx="auto"
        >
          <img width={52} height={52} src={isDarkTheme ? "/skylarklabs_logo.png" : "/skylarklabs_logo_light.png"} alt="logo" />
          <img src={isDarkTheme ? "/skylarklabs_logo_text.png" : "/skylarklabs_logo_text-light.png"} alt="logo" width={"350px"} height={"30px"} />
        </Box>
      )}
      {showPrivacyButtons && (
        <Box
          sx={{
            width: "12rem",
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "135px",
          }}
        >
          <NavLink to="" style={{ textDecoration: "none", zIndex: 100 }}>
            <Typography
              variant="link5"
              sx={(theme) => ({
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                textDecoration: "none",
                fontSize: "14px",
                color: theme.palette.primary.main,
              })}
            >
              Terms of service
            </Typography>
          </NavLink>
          <NavLink to="" style={{ textDecoration: "none", zIndex: 100 }}>
            <Typography
              variant="link5"
              sx={(theme) => ({
                borderBottom: `1px solid ${theme.palette.primary.main}`,
                textDecoration: "none",
                fontSize: "14px",
                color: theme.palette.primary.main,
              })}
            >
              Privacy Policy
            </Typography>
          </NavLink>
        </Box>
      )}
    </>
  );
};

export default SkyLarkResponsiveLogo;
