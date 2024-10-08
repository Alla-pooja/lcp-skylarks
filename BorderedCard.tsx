import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import CustomDivider from "./CustomDivider";

export interface BorderedCardProps extends BoxProps {
  title?: string;
}

export default function BorderedCard({ title, children, ...rest }: BorderedCardProps) {
  const theme = useTheme();

  return (
    <Box
      {...rest}
      sx={{
        background: theme.palette.background.paper,
        p: 3,
        width: "100%",
        border: `1px solid ${theme.palette.additionalColors.border}`,
        borderRadius: 2,
        ...rest.sx,
      }}
    >
      {title && (
        <>
          <Typography variant="h4" color={theme.palette.text.titleLabel} mb={0.2}>
            {title}
          </Typography>
          <CustomDivider />
        </>
      )}
      {children}
    </Box>
  );
}
