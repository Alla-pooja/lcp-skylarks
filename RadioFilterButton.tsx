import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, ListItemText, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { ThemeVariantsProps } from "../theme";
import BaseInputDropdown from "./BaseInputDropdown";
import CustomSelectMenuItem from "./CustomSelectMenuItem";

export interface SelectValueType {
  id: string | number;
  text: string;
}

export interface RadioFilterButtonProps {
  onChange: (values: any) => any;
  options: SelectValueType[];
  label?: string;
  startIcon?: React.ReactNode;
  defaultValue?: string;
  sx?: SxProps<Theme>;
  placeholder?: string;
  endIcon?: React.ReactNode;
  textColor?: string;
  placeholderColor?: string;
  selectionData?: string;
  isReset?: boolean;
}

export default function RadioFilterButton({
  onChange,
  options,
  label,
  startIcon,
  defaultValue = "",
  sx,
  placeholder,
  endIcon,
  textColor,
  placeholderColor,
  selectionData,
  isReset,
}: RadioFilterButtonProps) {
  const theme = useTheme();
  const { themeMode } = useAppSelector((state) => state.theme);
  const isDarkTheme = themeMode === ThemeVariantsProps.dark;
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    const finalValue = event.target.value as string;
    onChange(finalValue);
    setValue(finalValue);
  };

  useEffect(() => {
    if (isReset) {
      setValue(defaultValue);
    }
  }, [isReset]);

  useEffect(() => {
    if (selectionData) {
      setValue(selectionData);
    }
  }, [selectionData]);

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="medium"
      displayEmpty
      input={<BaseInputDropdown />}
      sx={{
        // boxShadow: theme.palette.dashboardContainer.customButtonBoxShadow,
        marginTop: 0,
        ...sx,
        "& .MuiSelect-select": {
          paddingRight: "10px !important",
        },
        "& .MuiSvgIcon-root.MuiSelect-icon": {
          color: theme.palette.text.default,
          display: endIcon ? "block" : "none",
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
          sx: { marginTop: 0, px: 1, background: theme.palette.background.paper },
        },
      }}
      label={label}
      renderValue={(selected) => {
        const selectedOpt: any = options.find((data) => data.id === selected);
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {startIcon && <Box sx={{ display: "inline-flex", alignItems: "center", ml: 1 }}>{startIcon}</Box>}
            <Typography sx={{ paddingLeft: "10px" }} variant="link5" color={(theme) => theme.palette.additionalColors.light}>
              {label && `${label}:`}&nbsp;
            </Typography>

            {selected !== "" ? (
              <Typography
                variant="link5"
                color={(theme) => textColor || theme.palette.text.default}
                sx={{
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100px",
                }}
              >
                {selectedOpt && selectedOpt?.text}
              </Typography>
            ) : (
              <Typography
                variant="link5"
                color={placeholderColor || theme.palette.additionalColors.placeholder}
                sx={{ textTransform: "capitalize", ml: "-6px" }}
              >
                {placeholder}
              </Typography>
            )}
          </Box>
        );
      }}
      IconComponent={ExpandMoreIcon}
    >
      {options &&
        options.map((option) => {
          return (
            <CustomSelectMenuItem
              key={option.id}
              value={option.id}
              style={{
                padding: "0px 10px 0 0",
                textTransform: "capitalize",
              }}
              sx={{ p: "0", py: 0 }}
            >
              {value === option.id ? (
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <img alt="radio icon" src={isDarkTheme ? "/assets/dropdown_radio.png" : "/assets/light_radio_dropdown.png"} />
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <img alt="radio icon" src="/assets/dropdown_radio_unselected.png" />
                </Box>
              )}
              {/* <Radio checked={value === option.id} /> */}
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
    </Select>
  );
}
