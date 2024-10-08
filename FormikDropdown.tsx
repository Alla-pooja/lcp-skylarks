import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FormHelperText, Select, useTheme } from "@mui/material";
import { Field } from "formik";
import React from "react";
import CustomSelectInputField from "./CustomSelectInputField";

export interface CustomSelectProps {
  children?: React.ReactNode;
  errorString: string;
  [x: string]: any;
}

const CustomSelect = ({ children, errorString, ...rest }: CustomSelectProps) => {
  const theme = useTheme();

  return (
    <>
      <Select
        inputProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                border: "1px solid #ffffff00",
                marginTop: "-15px",
                background: theme.palette.background.default,
              },
            },
            MenuListProps: {
              sx: {
                px: 1.3,
                background: theme.palette.background.default,
                maxHeight: "30vh",
              },
            },
          },
        }}
        size="medium"
        IconComponent={KeyboardArrowDownIcon}
        input={<CustomSelectInputField />}
        SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
        sx={{
          "& .MuiSelect-select": {
            borderRadius: "4px",
            padding: "8px",
          },
        }}
        {...rest}
      >
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </>
  );
};

export interface FormikDropdownProps {
  name: string;
  [x: string]: any;
}

export default function FormikDropdown({ name, ...rest }: FormikDropdownProps) {
  return <Field name={name} as={CustomSelect} {...rest} />;
}
