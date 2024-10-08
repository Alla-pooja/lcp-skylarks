import { Box, MenuItem } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { ThemeVariantsProps } from "../theme";
import CustomDivider from "./CustomDivider";

export interface RadioDropdownMenuItemProps {
  children?: React.ReactNode;
  [x: string]: any;
}

export default function RadioDropdownMenuItem({ children, ...props }: RadioDropdownMenuItemProps) {
  const { themeMode } = useAppSelector((state) => state.theme);
  const isDarkTheme = themeMode === ThemeVariantsProps.dark;

  return (
    <>
      <MenuItem
        {...props}
        sx={(theme) => ({
          py: 1.5,
          color: theme.palette.text.titleLabel,
          fontSize: "14px",
          textTransform: "capitalize",
        })}
      >
        {props.selected ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={isDarkTheme ? "/assets/dropdown_radio.png" : "/assets/light_radio_dropdown.png"} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src="/assets/dropdown_radio_unselected.png" />
          </Box>
        )}
        &nbsp;&nbsp;{children}
      </MenuItem>
      <CustomDivider />
    </>
  );
}
