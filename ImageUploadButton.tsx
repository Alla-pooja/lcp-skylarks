import { useTheme } from "@mui/material";
import React from "react";
import { BiEdit } from "react-icons/bi";

export interface ImageUploadButtonProps {
  getFile: (values: File) => File;
}

export default function ImageUploadButton({ getFile }: ImageUploadButtonProps) {
  const theme = useTheme();
  const [file, setFile] = React.useState<File>();
  const [imgSrc, setImgSrc] = React.useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(() => {
      if (!e.target.files) return;
      const file = e.target.files[0];
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
        <BiEdit size={20} color={theme.palette.primary.main} style={{ marginTop: "0.5rem" }} />
      </label>
    </>
  );
}
