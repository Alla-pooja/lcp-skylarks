import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { SxProps, Theme } from "@mui/material";
import CustomTextButton, { CustomTextButtonProps } from "./CustomTextButton";

export interface BackButtonProps extends CustomTextButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function BackButton({ children, sx, ...rest }: BackButtonProps) {
  return (
    <CustomTextButton
      startIcon={<KeyboardArrowLeftIcon fontSize="large" sx={{ mt: "-4px" }} />}
      sx={{ "& .MuiButton-startIcon": { mr: 0 }, fontWeight: 600, fontSize: "16px", ...sx }}
      {...rest}
    >
      {children || "Back"}
    </CustomTextButton>
  );
}
