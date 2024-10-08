import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

interface CustomAudioSliderProps {
  children?: React.ReactNode;
}

export const CustomAudioSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.text.default,
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 12,
    width: 14,
    backgroundColor: "#fff",
    background: "linear-gradient(121.46deg, #2EA3FE 10.95%, #102E48 94.53%)",
    boxShadow: "-4px -4px 9px rgba(48, 62, 90, 0.55), 10px 10px 20px #12161D",
    borderRadius: 4,
    "& .custom-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? theme.palette.background.dark : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
    boxShadow: theme.palette.dashboardContainer.customDividerBoxShadow,
  },
}));

const AudioSlider: FC<CustomAudioSliderProps> = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="custom-bar" />
      <span className="custom-bar" />
      <span className="custom-bar" />
    </SliderThumb>
  );
};

export default AudioSlider;
