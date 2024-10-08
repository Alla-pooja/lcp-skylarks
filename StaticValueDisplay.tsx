import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Typography, useTheme } from "@mui/material";
import CustomDivider from "./CustomDivider";

export interface StaticValueDisplayProps {
  label: string;
  value: string | number;
  readOnly?: boolean;
}

export default function StaticValueDisplay({ label, value, readOnly = false }: StaticValueDisplayProps) {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="caption2" color={(theme) => theme.palette.text.captionColor}>
        {label}
      </Typography>
      <Typography variant="subtitle1" my={1} position="relative" sx={{ color: theme.palette.text.titleLabel }}>
        {value || "NA"}
        {readOnly && <ErrorOutlineIcon color="primary" sx={{ fontSize: "14px", mx: 1, position: "absolute" }} />}
      </Typography>
      <CustomDivider />
    </Box>
  );
}
