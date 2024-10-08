import { Box } from "@mui/material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

interface VideoSeekingSliderProps {
  bar: string;
  children?: React.ReactNode;
}

export const CustomSliderThumb = styled(Slider)(({ theme }) => ({
  color: "#3a8589",
  height: "100%",
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 30,
    width: 12,
    background: "linear-gradient(180deg, rgba(228, 46, 1, 0.6) 0%, rgba(228, 46, 1, 0) 71.87%)",
    borderRadius: "0.2px",
    "&:hover": {
      boxShadow: "none",
    },
    "& .seeker-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    display: "none",
  },
  "& .MuiSlider-rail": {
    display: "none",
  },
}));

export const VideoSeekingSlider: FC<VideoSeekingSliderProps> = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      <Box
        sx={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: `6px solid red`,
          margin: "2rem",
          marginBottom: "80px",
        }}
      ></Box>
      {children}
    </SliderThumb>
  );
};

export default VideoSeekingSlider;
