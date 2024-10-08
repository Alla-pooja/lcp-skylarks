import { Typography } from "@mui/material";
import { Field, useField } from "formik";
import React from "react";
import CustomInputField from "./CustomInputField";

export interface FormikInputFieldProps {
  name: string;
  errorText?: string;
  initialhelper?: React.ReactNode;
  onChange: (value: any) => void;
  [x: string]: any;
}

export default function FormikInputField(props: FormikInputFieldProps) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <Field
      as={CustomInputField}
      size="small"
      variant="outlined"
      autoComplete="off"
      error={meta.touched && Boolean(meta.error)}
      helperText={
        meta.touched && meta.error ? (
          meta.error
        ) : (
          <Typography component={"span"} ml={-1} variant="caption">
            {props.initialhelper}
          </Typography>
        )
      }
      {...field}
      {...rest}
      value={field.value}
    />
  );
}
