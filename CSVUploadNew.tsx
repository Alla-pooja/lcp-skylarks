import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { BsUpload } from "react-icons/bs";

export interface CSVUploadProps {
  getFile: (values: any) => void;
  label?: string;
  multiple?: boolean;
  fileType?: string;
  fileFormat?: string;
}

export default function CSVUpload({ getFile, label, multiple, fileType = "", fileFormat = "" }: CSVUploadProps) {
  const theme = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e?.target?.files.length > 0) {
      const files = e?.target?.files;
      getFile(files);
      return files;
    }
  };

  const acceptType = fileType !== "text" ? `${fileType}/${fileFormat || "*"}` : `.${fileFormat}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "175px",
          background: theme.palette.background.paper,
          boxShadow: theme.palette.dashboardContainer.insetBoxShadow,
          borderRadius: "8px",
        }}
      >
        <input
          style={{ display: "none" }}
          id="file"
          name="file"
          className="file"
          type="file"
          accept={acceptType}
          onChange={handleFileChange}
          multiple={multiple ? true : false}
        />
        <label htmlFor="file">
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
              width: "90%",
              height: "135px",
              borderRadius: "8px",
              mx: "auto",
              mt: "20px",
              p: 2,
            }}
          >
            <BsUpload size="2rem" color={theme.palette.checkbox.darkBorder} />
            <Typography variant="caption" color={theme.palette.checkbox.darkBorder} mt={2}>
              {"Click to upload or drag and drop (.csv)"}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.titleLabel, textDecoration: "underline", pt: 4, pb: 2 }}>
              {label}
            </Typography>
          </Box>
        </label>
      </Box>
    </Box>
  );
}
