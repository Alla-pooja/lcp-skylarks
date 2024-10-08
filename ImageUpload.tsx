import { Box, Typography } from "@mui/material";
import React from "react";
import { BsUpload } from "react-icons/bs";

export interface ImageUploadProps {
  getFile: (values: File) => File;
  helpText: string;
}

export default function ImageUpload({ getFile, helpText }: ImageUploadProps) {
  const [file, setFile] = React.useState<File>();
  const [imgSrc, setImgSrc] = React.useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(() => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      if (!file) return;
      const fileUrl = URL.createObjectURL(file);
      setImgSrc(fileUrl);
      getFile(file);
      return file;
    });
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        id="profilePicture"
        name="profilePicture"
        className="profilePicture"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="profilePicture">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            cursor: "pointer",
            borderRadius: 1,
            border: "3px dashed #5A80AA",
            p: 5,
            width: "100%",
          }}
        >
          {file && imgSrc ? <img src={imgSrc} alt="uploaded file" width="100%" /> : <BsUpload size="4rem" color="#3D4860" />}
          <Typography color="#3D4860" mt={2}>
            {helpText || "Click to upload a new image."}
          </Typography>
        </Box>
      </label>
    </>
  );
}
