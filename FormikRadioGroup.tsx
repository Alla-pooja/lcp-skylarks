import React from "react";

import { Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Field } from "formik";

const renderOptions = (options: Record<string, any>[]) => {
  return options.map((option) => <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />);
};

export interface CustomRadioGroupProps {
  field: any;
  form: { touched: Record<string, any>; errors: Record<string, any> };
  name: string;
  options: Record<string, any>[];
  children?: React.ReactNode;
  [x: string]: any;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({ field, form: { touched, errors }, name, options, children, ...props }) => {
  const fieldName = name || field.name;

  return (
    <React.Fragment>
      <RadioGroup {...field} {...props} name={fieldName}>
        {/* Here you either map over the props and render radios from them,
         or just render the children if you're using the function as a child*/}
        {options ? renderOptions(options) : children}
      </RadioGroup>

      {touched[fieldName] && errors[fieldName] && (
        <Typography variant="caption" color="red">
          {errors[fieldName]}
        </Typography>
      )}
    </React.Fragment>
  );
};

export interface FormikRadioGroupProps {
  name: string;
  options?: object[];
  [x: string]: any;
}

const FormikRadioGroup = ({ name, options, ...rest }: FormikRadioGroupProps) => {
  return <Field name={name} options={options} as={CustomRadioGroup} {...rest} />;
};

export default FormikRadioGroup;
