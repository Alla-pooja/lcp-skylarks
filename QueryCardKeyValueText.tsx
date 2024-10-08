import { Grid, Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export interface QueryCardKeyValueTextProps {
  keyName: string;
  value?: string;
  sx?: SxProps<Theme>;
}

export default function QueryCardKeyValueText({ keyName, value = "--", sx }: QueryCardKeyValueTextProps) {
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={1}
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <Grid item xs={4}>
        <Typography variant="subtitle2" color={theme.palette.additionalColors.light}>
          {keyName}:
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="caption" color={theme.palette.text.main} sx={{ textTransform: "capitalize" }}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
}
