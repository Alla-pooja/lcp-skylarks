import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setActiveAnalysisTab } from "../store/ui/uiSlice";

export interface StaticsProps {
  label: string;
  count: string;
  icon: React.ReactNode;
}
export default function CustomStatics({ label, count, icon }: StaticsProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams({ tab: "home" });

  const handleClick = () => {
    if (label === "Entities") {
      dispatch(setActiveAnalysisTab("entities"));
      setSearchParams((params) => {
        params.set("page", "entities");
        return params;
      });
    }
    if (label === "Results") {
      dispatch(setActiveAnalysisTab("feed"));
      setSearchParams((params) => {
        params.set("page", "feed");
        return params;
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: theme.palette.background.darkCardBackground,
        display: "flex",
        p: 2,
        border: theme.palette.additionalColors.databasecardBorder,
        borderRadius: "8px",
        cursor: label === "Entities" || label === "Results" ? "pointer" : "default",
      }}
      onClick={handleClick}
    >
      <Box>
        <Typography variant="subtitle1" color={theme.palette.text.titleLabel}>
          {label}
        </Typography>
        <Typography variant="h3" mt={0.5} color={theme.palette.text.titleLabel}>
          {count}
        </Typography>
      </Box>
      <Box sx={{ background: theme.palette.primary.tertiaryGradient, p: 1 }} pt={1} ml="auto">
        {icon}
      </Box>
    </Box>
  );
}
