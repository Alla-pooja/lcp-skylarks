import { InputBase } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";

export interface CustomSelectInputFieldProps {
  theme: Theme;
  customWidth?: string;
  customMargin?: string;
  type?: string;
}

const CustomSelectInputField = styled(InputBase)(({ theme, customWidth = "", customMargin = "", type }: CustomSelectInputFieldProps) => ({
  width: customWidth !== "" ? customWidth : "100%",
  height: "4.9rem",
  marginLeft: customMargin !== "" ? customMargin : "0px",
  "& .Mui-error .MuiInputBase-input": {
    color: theme.palette.text.errorInputField,
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.action.disabled,
    opacity: "0.2",
  },
  "& .MuiInputBase-input:focus::placeholder": {
    color: "transparent",
  },
  "& .MuiInputBase-root.Mui-focused": {
    color: type === "password" ? theme.palette.primary.main : theme.palette.text.activeInputField,
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
    boxShadow: theme.palette.dashboardContainer.insetBoxShadow,
    backgroundColor: theme.palette.background.default,
  },
  "& .MuiInputBase-adornedEnd .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.text.defaultInputField,
  },
  "& .MuiInputBase-adornedEnd.Mui-focused .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.text.activeInputField,
  },
  "& .MuiInputBase-adornedEnd.Mui-error .MuiSvgIcon-root": {
    width: "20px",
    height: "20px",
    color: theme.palette.text.activeInputField,
  },
  "& .MuiInputBase-adornedStart": {
    boxShadow: theme.palette.dashboardContainer.customInputBoxShadow,
    backgroundColor: theme.palette.background.default,
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
  "& .MuiInputBase-input": {
    background: theme.palette.background.default,
    color: theme.palette.text.activeInputField,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "20px",
    boxShadow: theme.palette.dashboardContainer.insetBoxShadow,
  },
  "& .MuiInputBase-input.Mui-error": {
    color: "red",
  },
}));

export default CustomSelectInputField;
