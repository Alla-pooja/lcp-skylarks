import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Autocomplete, Box, Checkbox, MenuItem, SxProps, Theme, useTheme } from "@mui/material";
import CustomInputField from "./CustomInputField";

import { useEffect, useState } from "react";
import { MultiSelectValueType } from "./CheckboxFilterButton";
import CustomDivider from "./CustomDivider";

export interface MultiSelectAutocompleteProps {
  options: readonly any[];
  placeholder: string;
  defaultValue?: any[];
  selectionData?: MultiSelectValueType[];
  [x: string]: any;
  sx?: SxProps<Theme>;
  isReset?: boolean;
  handleAutoChange: (values: MultiSelectValueType[]) => void;
}

const MultiSelectAutocomplete = ({
  options,
  placeholder,
  defaultValue,
  selectionData,
  isReset,
  handleAutoChange,
  sx,
  ...rest
}: MultiSelectAutocompleteProps) => {
  const theme = useTheme();
  const [selectedValues, setSelectedValues] = useState<MultiSelectValueType[]>([]);

  const handleChange = (value: MultiSelectValueType[]) => {
    handleAutoChange(value);
    setSelectedValues(value);
  };

  useEffect(() => {
    if (isReset) {
      setSelectedValues([]);
    }
  }, [isReset]);

  useEffect(() => {
    if (selectionData) {
      setSelectedValues(selectionData);
    }
  }, [selectionData]);

  return (
    <Autocomplete
      value={selectedValues}
      onChange={(event: any, newValue: any) => {
        handleChange(newValue);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      multiple
      popupIcon={<KeyboardArrowDownIcon />}
      options={options}
      getOptionLabel={(option) => option.text}
      defaultValue={defaultValue}
      disableCloseOnSelect
      sx={{
        "& .MuiInputBase-root": {
          fontSize: "14px",
        },
        "& .MuiInputBase-adornedStart .MuiSvgIcon-root": { color: theme.palette.text.titleLabel },
        "& .MuiButtonBase-root.MuiChip-root": {
          height: "24px",
        },
      }}
      ChipProps={{
        sx: {
          background: theme.palette.primary.tertiary,
          borderRadius: "4px",
          color: theme.palette.error.btnText,
          "& .MuiInputBase-adornedEnd .MuiSvgIcon-root": { color: theme.palette.error.btnText },
        },
        deleteIcon: <ClearIcon sx={{ color: theme.palette.text.default }} />,
      }}
      renderOption={(props, option, { selected }) => {
        return (
          <Box
            key={option.id}
            sx={{
              px: 2,
            }}
          >
            <MenuItem
              sx={{
                ...theme.typography.body4,
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                background: "transparent !important",
                color: theme.palette.text.titleLabel,
                ...sx,
              }}
              {...props}
            >
              <Checkbox
                checked={selected}
                sx={{
                  p: 0,
                  fontSize: "14px",
                  fontWeight: "400",
                  "& .MuiSvgIcon-root": {
                    fill: (theme) => (selected ? theme.palette.checkbox.default : theme.palette.checkbox.darkBorder),
                  },
                  "&:hover .MuiSvgIcon-root": {
                    fill: (theme) =>
                      selected ? theme.palette.checkbox.default : "linear-gradient(135deg, rgba(38, 46, 63, 0.70) 0%, rgba(29, 35, 48, 0.70) 100%)",
                    stroke: (theme) => (selected ? "none" : theme.palette.checkbox.darkBorder),
                  },
                  "&:active .MuiSvgIcon-root": {
                    fill: (theme) => (selected ? "#245785" : theme.palette.checkbox.darkBorder),
                  },
                  "& .MuiButtonBase-root.MuiCheckbox-root": {
                    pl: "5px",
                    ml: "auto",
                  },
                }}
              />
              {option?.text ? option.text : option}
            </MenuItem>
            <CustomDivider />
          </Box>
        );
      }}
      renderInput={(params) => <CustomInputField {...params} variant="outlined" placeholder={placeholder} />}
      {...rest}
    />
  );
};

export default MultiSelectAutocomplete;
