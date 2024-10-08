import { Box, useTheme } from "@mui/material";

export interface NavbarCurveComponentProps {
  leftValBoxOne: string;
  leftValBoxTwo: string;
  topValBoxTwo: string;
  heightBoxTwo: string;
  leftValCircle: string;
  topValCircle: string;
  displayXS: string;
}

// This component is created to achieve the navbar curve on the right bottom corner.

const NavbarCurveComponent = ({
  leftValBoxOne,
  leftValBoxTwo,
  topValBoxTwo,
  heightBoxTwo,
  leftValCircle,
  topValCircle,
  displayXS = "inline-block",
}: NavbarCurveComponentProps) => {
  const theme = useTheme();

  return (
    <Box position={"absolute"}>
      <Box
        sx={{
          display: { xs: displayXS, md: "inline-block" },
          width: "30px",
          height: heightBoxTwo ? heightBoxTwo : "30px",
          backgroundColor: theme.palette.dashboardContainer.navbarCurveColorXS,
          position: "relative",
          top: topValBoxTwo ? topValBoxTwo : "36px",
          left: leftValBoxOne,
          zIndex: 1,
          borderBottomRightRadius: "10px",
        }}
      ></Box>
      <Box
        sx={{
          display: { xs: displayXS, md: "inline-block" },
          width: "30px",
          height: "30px",
          backgroundColor: { xs: theme.palette.dashboardContainer.navbarCurveColorXS, md: theme.palette.dashboardContainer.navbarCurveColorMD },
          position: "relative",
          top: "3px",
          left: leftValBoxTwo,
          zIndex: 6,
        }}
      ></Box>
      <Box
        sx={{
          display: { xs: displayXS, md: "inline-block" },
          width: "40px",
          height: "40px",
          backgroundColor: { xs: theme.palette.dashboardContainer.navbarCurveColorXS, md: theme.palette.dashboardContainer.navbarCurveColorMD },
          position: "relative",
          top: topValCircle ? topValCircle : "25px",
          left: leftValCircle,
          zIndex: 5,
          borderRadius: "50%",
          boxShadow: theme.palette.dashboardContainer.navbarCurveBoxShadow,
        }}
      ></Box>
    </Box>
  );
};

export default NavbarCurveComponent;
