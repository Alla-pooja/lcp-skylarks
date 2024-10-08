import { Box, Typography, useTheme } from "@mui/material";

export default function CustomNoResults() {
  const theme = useTheme();
  return (
    <Box display="flex" width={{ xs: "30%", xl: "20%" }} mt={8} flexDirection="column" justifyContent="center" alignItems="center" mx="auto">
      <Box textAlign="center">
        <img src="/assets/no_result.png" alt="no results" />
        <Typography variant="h2" color={theme.palette.text.titleLabel} mt={2}>
          No Results Found
        </Typography>
        <Typography variant="h4" color={theme.palette.primary.inactiveIcon} mt={2}>
          We can’t find any publication matching your search. Try edit filters or change Query
        </Typography>
      </Box>
    </Box>
  );
}
