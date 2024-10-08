import { Box, Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export interface CustomDateFieldProps {
  icon: React.ReactNode;
  text: string;
  sx: SxProps<Theme>;
}

const CustomDataField: React.FC<CustomDateFieldProps> = ({ icon, text, sx }) => {
  const theme = useTheme();

  return (
    <Box
      p={1}
      sx={{
        background: theme.palette.background.paper,
        boxShadow: theme.palette.dashboardContainer.insetBoxShadow,
        borderRadius: "4px",
        display: "flex",
        color: (theme) => theme.palette.primary.main,
        ...sx,
      }}
    >
      {icon && icon}
      <Typography px={1} py={0.5} variant="caption" sx={{ color: (theme) => theme.palette.text.titleLabel }}>
        {text}
      </Typography>
    </Box>
  );
};

export default CustomDataField;
