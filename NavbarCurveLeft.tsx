import { Box, useTheme } from "@mui/material";

// This component is created to achieve the navbar curve on the left bottom corner.

export interface NavbarCurveLeftProps {
  leftValBox?: string;
  topValBox?: string;
  curveLeftVal?: string;
  curveTopVal?: string;
}

const NavbarCurveLeft = ({ leftValBox, topValBox, curveLeftVal, curveTopVal }: NavbarCurveLeftProps) => {
  const theme = useTheme();

  return (
    <Box position={"absolute"}>
      <Box
        sx={{
          display: { md: "inline-block" },
          width: "21px",
          height: "24px",
          backgroundColor: { xs: theme.palette.background.paper, md: theme.palette.dashboardContainer.navbarCurveColorMD },
          position: "absolute",
          top: topValBox ? topValBox : "2px",
          left: leftValBox ? leftValBox : "-58px",
          zIndex: 6,
        }}
      ></Box>
      <Box
        sx={{
          left: curveLeftVal ? curveLeftVal : "-64px",
          top: curveTopVal ? curveTopVal : "13px",
          display: "inline-block",
          width: "31px",
          height: "30px",
          position: "absolute",
          zIndex: 5,
          borderRadius: "50%",
          boxShadow: `-9px 2px 6px 0px ${theme.palette.dashboardContainer.navbarCurveLeftColor}`,
          transform: `rotate(-155deg)`,
        }}
      ></Box>
    </Box>
  );
};

export default NavbarCurveLeft;
