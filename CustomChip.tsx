import React from "react";
import Chip from "@mui/material/Chip";

export default function CustomChip({ ...props }) {
  return <Chip {...props} sx={{ background: "#245785", borderRadius: "4px", ...props.sx }} />;
}
