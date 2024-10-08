import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Checkbox, InputAdornment, ListItemText, Typography, useTheme } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material/styles";
import React, { useEffect } from "react";
import CustomInputField from "./CustomInputField";
import CustomSelectMenuItem from "./CustomSelectMenuItem";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";

export interface MultiSelectValueType {
  id: string | number;
  text: string;
}

export interface CustomMultiselectProps {
  onChange: (values: any) => any;
  showSearch?: boolean;
  options: MultiSelectValueType[];
  label: string;
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  placeholder?: string;
  placeholderColor?: string;
  selectionData?: MultiSelectValueType[];
  isReset?: boolean;
}

export default function CustomMultiselect({
  onChange,
  options,
  showSearch,
  label,
  startIcon,
  sx,
  placeholder,
  placeholderColor,
  selectionData,
  isReset,
}: CustomMultiselectProps) {
  const theme = useTheme();
  const [displayOptions, setDisplayOptions] = React.useState<MultiSelectValueType[]>(options);
  const [selectedValues, setSelectedValues] = React.useState<MultiSelectValueType[]>(selectionData || []);

  const handleChange = (e: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = e;

    if (typeof value === "string") return;

    let finalValues: MultiSelectValueType[] = [];

    if (value.find((item) => item.text.toLowerCase() === "all")) {
      finalValues = displayOptions;
    } else {
      value.forEach((item: MultiSelectValueType) => {
        if (finalValues.findIndex((o) => o.id === item.id) >= 0) {
          finalValues = finalValues.filter((x) => x.id === item.id);
        } else {
          finalValues.push(item);
        }
      });
    }

    setSelectedValues(() => {
      onChange(finalValues);
      return finalValues;
    });
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = displayOptions.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(e.target.value);
      });
    });
    if (filtered.length > 0) {
      setDisplayOptions(filtered);
    } else {
      setDisplayOptions(options);
    }
  };

  return (
    <MultipleSelectCheckmarks
      sx={{
        marginTop: 0,
        border: `0.5px solid ${theme.palette.additionalColors.border}`,
        boxShadow: "10px 10px 17px 0px #12161DB2, box-shadow: -6px -6px 11px 0px #303E5A73",
        borderRadius: 1,
        ...sx,
        "& .MuiSvgIcon-root.MuiSelect-icon": {
          color: theme.palette.text.default,
        },
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        PaperProps: {
          sx: { marginTop: 1, padding: "0 10px", background: theme.palette.background.paper },
        },
      }}
      onChange={handleChange}
      value={selectedValues}
      label={label}
      renderValue={(selected: MultiSelectValueType[]) => {
        const selectedTextsArr = selected.map((item) => item.text);

        let selectedTexts: string = selectedTextsArr.join(", ");

        if (selected.length > 0) {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="link5"
                color={(theme) => theme.palette.text.titleLabel}
                sx={{
                  textTransform: "capitalize",
                  pl: 1,
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "auto",
                }}
              >
                {selectedTexts}
              </Typography>
            </Box>
          );
        } else {
          return (
            <Typography
              variant="link5"
              color={placeholderColor || theme.palette.additionalColors.placeholder}
              sx={{ pl: 1, textTransform: "capitalize" }}
            >
              {placeholder}
            </Typography>
          );
        }
      }}
      customWidth="100%"
      IconComponent={ExpandMoreIcon}
    >
      {showSearch && (
        <CustomInputField
          placeholder=" Search"
          size="small"
          variant="outlined"
          autoComplete="off"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      {displayOptions.map((option) => {
        return (
          <CustomSelectMenuItem
            key={option.id}
            value={option}
            style={{
              padding: "0px 10px 0 0",
              textTransform: "capitalize",
            }}
            sx={{ p: "0", py: 0 }}
          >
            <Checkbox checked={selectedValues.findIndex((item) => item.id === option.id) >= 0} />
            <ListItemText
              primary={option.text}
              primaryTypographyProps={{
                style: {
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100px",
                },
              }}
            />
          </CustomSelectMenuItem>
        );
      })}
    </MultipleSelectCheckmarks>
  );
}
