import * as React from "react";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BaseInputDropdown from "./BaseInputDropdown";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export interface MultipleSelectCheckmarksProps {
  value: any;
  onChange: (value: any) => any;
  renderValue: (value: any) => any;
  children?: React.ReactNode;
  [x: string]: any;
  customWidth?: string;
}

export default function MultipleSelectCheckmarks({ value, onChange, renderValue, children, customWidth, ...rest }: MultipleSelectCheckmarksProps) {
  return (
    <FormControl sx={{ width: customWidth || "auto" }}>
      <Select
        value={value}
        onChange={onChange}
        renderValue={renderValue}
        size="medium"
        multiple
        displayEmpty
        input={<BaseInputDropdown />}
        IconComponent={undefined}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              border: "1px solid #ffffff00",
              marginTop: "-3px",
            },
          },
          MenuListProps: {
            sx: {
              px: 1.3,
              background: (theme) => theme.palette.background.default,
            },
          },
        }}
        sx={(theme) => ({
          "& .MuiSelect-select.MuiInputBase-input": {
            px: "16px !important",
          },
          "& .MuiSelect-select": {
            borderRadius: "4px",
          },
          [theme.breakpoints.down("lg")]: {
            fontSize: "15px",
          },
        })}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
}
