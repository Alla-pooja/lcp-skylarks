import { TextField, Theme, styled } from "@mui/material";

export interface TextFieldProps {
  theme: Theme;
  customWidth?: string;
}

const CustomTextField = styled(TextField)(({ theme, customWidth = "" }: TextFieldProps) => ({
  width: customWidth !== "" ? customWidth : "100%",
  borderRadius: "6px",
  ...theme.typography.caption,
  borderColor: "transparent",
  // padding: "0px",
  // margin: "0px",
  // boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
  "& .MuiInputBase-input::placeholder": {
    padding: "10px",
    color: theme.palette.text.defaultInputField,
  },
  "&:hover .MuiInputBase-input::placeholder": {
    color: theme.palette.text.defaultInputField,
  },
  "& .MuiInputBase-input:focus::placeholder": {
    color: "transparent",
  },
  "& .MuiInputBase-root.Mui-focused": {
    border: "none",
    color: theme.palette.text.captionColor,
  },
  "&:active .MuiInputBase-root": {
    border: "none",
    color: theme.palette.text.captionColor,
  },
  "&:hover .MuiInputBase-root": {
    border: "none",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    padding: "0px",
  },
  "& .MuiInputBase-input": {
    background: theme.palette.background.default,
    ...theme.typography.caption,
    color: theme.palette.text.captionColor,
  },
}));

export interface CustomCommentsFieldProps {
  [x: string]: any;
}

const CustomCommentsField: React.FC<CustomCommentsFieldProps> = (props) => {
  return <CustomTextField {...props} />;
};

export default CustomCommentsField;
