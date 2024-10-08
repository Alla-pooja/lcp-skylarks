import { Box, useTheme } from "@mui/material";
import React from "react";

// This component is created to achieve the navbar curve on the right bottom corner.

export interface NavbarCurveRightProps {
  rightValBox: string;
  secondBoxCurve: string;
  rightTop: string;
}

const NavbarCurveRight = ({ rightValBox, secondBoxCurve, rightTop }: NavbarCurveRightProps) => {
  const theme = useTheme();

  return (
    <Box position={"absolute"}>
      <Box
        sx={{
          display: { md: "inline-block" },
          width: "21px",
          height: "24px",
          backgroundColor: { xs: theme.palette.background.paper, md: "#232A38" },
          position: "absolute",
          top: "-18px",
          right: rightValBox || "-127px",
          zIndex: 6,
        }}
      ></Box>
      <Box className="right-curve" sx={{ right: secondBoxCurve, top: rightTop || "-8px" }}></Box>
    </Box>
  );
};

export default NavbarCurveRight;
