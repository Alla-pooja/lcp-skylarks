import { Box, Typography, useTheme } from "@mui/material";

export interface Transcript {
  time: string;
  text: string;
}

interface TranscriptProps {
  transcript: Transcript[];
}

export default function CustomTranscript({ transcript }: TranscriptProps) {
  const theme = useTheme();

  return (
    <>
      {transcript.map((summary, idx) => (
        <Box key={`script-${idx}`} display="flex" gap={2} mb={2}>
          <Typography variant="body3" color={theme.palette.text.tableHeader}>
            {summary?.time}
          </Typography>
          <Typography variant="body3" color={theme.palette.text.captionColor} width={{ xs: "100%", lg: "70%", xl: "100%" }}>
            {summary?.text}
          </Typography>
        </Box>
      ))}
    </>
  );
}
