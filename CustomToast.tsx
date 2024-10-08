import { Theme } from "@mui/material";
import { Zoom, toast } from "react-toastify";

export const customToast = (theme: Theme, msg: string, type: string) => {
  if (type === "success") {
    toast.success(msg, {
      theme: "dark",
      transition: Zoom,
      style: { ...theme.typography.body4, background: theme.palette.background.dark, border: `1px solid ${theme.palette.text.default}` },
    });
  } else {
    toast.error(msg, {
      theme: "dark",
      transition: Zoom,
      style: { ...theme.typography.body4, background: theme.palette.background.dark, border: `1px solid ${theme.palette.text.default}` },
    });
  }
};
