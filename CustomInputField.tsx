import { TextField, TextFieldProps, Theme, styled } from "@mui/material";

export interface CustomTextFieldProps {
  theme: Theme;
  type?: string;
}

const CustomTextField = styled(TextField)(({ theme, type }: CustomTextFieldProps) => ({
  marginTop: "8px",
  // boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
  borderRadius: "6px",
  "& :-webkit-autofill": {
    transitionDelay: "9999s",
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.text.defaultInputField,
  },
  "& .Mui-error .MuiInputBase-input": {
    color: theme.palette.text.errorInputField,
  },
  "& .MuiInputBase-input:focus::placeholder": {
    color: "transparent",
  },
  "& .MuiInputBase-root.Mui-focused": {
    color: type === "password" ? theme.palette.primary.main : theme.palette.text.titleLabel,
  },
  "&:active:hover .MuiInputBase-root": {
    color: type === "password" ? theme.palette.primary.main : theme.palette.text.activeInputField,
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#BDC8D3",
    opacity: 0.12,
  },
  "& .MuiInputAdornment-root ": {
    marginRight: "5px",
  },
  "& .MuiInputBase-adornedEnd": {
    // boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
    backgroundColor: "transparent",
  },
  "& .MuiInputBase-adornedEnd .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.text.defaultInputField,
  },
  "& .MuiInputBase-adornedEnd.Mui-focused .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.primary.main,
  },
  "&:active:hover .MuiInputBase-adornedEnd .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.primary.main,
  },
  "& .MuiInputBase-adornedEnd.Mui-error .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.primary.main,
  },
  "& .MuiInputBase-adornedStart": {
    // boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
    backgroundColor: "transparent",
  },
  "& .MuiInputBase-adornedStart .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.text.defaultStartIcon,
  },
  "& .MuiInputBase-adornedStart.Mui-focused .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.primary.main,
  },
  "& .MuiButtonBase-root-MuiIconButton-root": {
    backgroundColor: theme.palette.background.default,
  },
  "&:active .MuiButtonBase-root-MuiIconButton-root": {
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiInputBase-root": {
    background: theme.palette.background.default,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "20px",
    borderRadius: "6px",
    boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
    color: type === "password" ? theme.palette.primary.main : theme.palette.text.titleLabel,
  },
  "& .MuiInputBase-input.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiInputBase-input:invalid": {
    // boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
  },
}));

const CustomInputField: React.FC<TextFieldProps> = ({ ...props }) => {
  return <CustomTextField {...props} />;
};

export default CustomInputField;
