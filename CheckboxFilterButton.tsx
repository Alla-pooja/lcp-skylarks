import SearchIcon from "@mui/icons-material/Search";
import { Box, Checkbox, InputAdornment, ListItemText, Typography, useTheme } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import CustomInputField from "./CustomInputField";
import CustomSelectMenuItem from "./CustomSelectMenuItem";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";

export interface MultiSelectValueType {
  id: string | number;
  text: string;
}

export interface CheckboxFilterButtonProps {
  onChange: (values: any) => any;
  showSearch?: boolean;
  options: MultiSelectValueType[];
  label: string;
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function CheckboxFilterButton({ onChange, options, showSearch, label, startIcon, sx }: CheckboxFilterButtonProps) {
  const theme = useTheme();
  const [displayOptions, setDisplayOptions] = React.useState<MultiSelectValueType[]>(options);
  const [selectedValues, setSelectedValues] = React.useState<MultiSelectValueType[]>([]);

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
      // console.log(finalValues);
      onChange(finalValues);
      return finalValues;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = displayOptions.filter((item) => {
      return Object.values(item).some((value) => {
        return String(value).toLowerCase().includes(e.target.value);
      });
    });
    console.log("filtered", filtered);
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
        borderRadius: 1,
        ...sx,
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
      IconComponent={null}
      onChange={handleChange}
      value={selectedValues}
      label={label}
      renderValue={(selected: MultiSelectValueType[]) => {
        let selectedTexts: string;

        const selectedTextsArr = selected.map((item) => item.text);
        if (selectedTextsArr.map((t) => t.toLowerCase()).includes("all")) {
          selectedTexts = "All";
        } else if (!selectedTextsArr.map((t) => t.toLowerCase()).includes("all") && selected.length === displayOptions.length - 1) {
          selectedTexts = "All";
        } else {
          selectedTexts = selected.length === 0 ? "All" : selectedTextsArr.join(", ");
        }
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {startIcon && <Box sx={{ display: "inline-flex", alignItems: "center", ml: 1 }}>{startIcon}</Box>}
            <Typography sx={{ paddingLeft: "10px" }} variant="link5" color={(theme) => theme.palette.additionalColors.light}>
              {label}:&nbsp;
            </Typography>
            <Typography variant="link5" color={(theme) => theme.palette.text.default} sx={{ textTransform: "capitalize" }}>
              {selectedTexts}
            </Typography>
          </Box>
        );
      }}
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
