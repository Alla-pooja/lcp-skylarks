import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { BsUpload } from "react-icons/bs";

export interface CSVUploadProps {
  getFile: (values: File) => File;
}

export default function CSVUpload({ getFile }: CSVUploadProps) {
  const theme = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    getFile(file);
    return file;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        px: 10,
      }}
    >
      <Box
        sx={{
          width: { xs: "308px", sm: "408px" },
          height: "175px",
          background: theme.palette.background.paper,
          boxShadow: theme.palette.dashboardContainer.insetBoxShadow,
          borderRadius: "8px",
        }}
      >
        <input style={{ display: "none" }} id="file" name="file" className="file" type="file" accept=".csv" onChange={handleFileChange} />
        <label htmlFor="file" style={{ position: "absolute", top: "56%", left: "50%", transform: " translate(-50%, -50%)" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              cursor: "pointer",
              background:
                "linear-gradient(to right, #5A80AA 50%, transparent 0%) top repeat-x, linear-gradient(#5A80AA 50%, transparent 0%) right repeat-y, linear-gradient(to right, #5A80AA 50%, transparent 0%) bottom repeat-x, linear-gradient(#5A80AA 50%, transparent 0%) left repeat-y",
              backgroundSize: "25px 3px, 3px 25px",
              width: { xs: "268px", sm: "368px" },
              height: "135px",
              borderRadius: "8px",
            }}
          >
            <BsUpload size="2rem" color={theme.palette.checkbox.darkBorder} />
            <Typography variant="caption" color={theme.palette.checkbox.darkBorder} mt={2}>
              {"Click to upload or drag and drop (.csv)"}
            </Typography>
          </Box>
        </label>
      </Box>
    </Box>
  );
}
