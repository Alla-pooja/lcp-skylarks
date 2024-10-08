import { Checkbox, FormControlLabel } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export interface CustomCheckboxProps {
  label?: string;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

export default function CustomCheckbox({ label, sx, ...rest }: CustomCheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            "& .MuiSvgIcon-root": {
              fill: (theme) => (rest.checked ? theme.palette.checkbox.default : theme.palette.checkbox.darkBorder),
            },
            "& .MuiButtonBase-root.MuiCheckbox-root": {
              pl: "5px",
            },
            "&:hover .MuiSvgIcon-root": {
              fill: (theme) =>
                rest.checked ? theme.palette.checkbox.default : "linear-gradient(135deg, rgba(38, 46, 63, 0.70) 0%, rgba(29, 35, 48, 0.70) 100%)",
              stroke: (theme) => (rest.checked ? "none" : theme.palette.checkbox.darkBorder),
            },
            "&:active .MuiSvgIcon-root": {
              fill: (theme) => (rest.checked ? "#245785" : theme.palette.checkbox.darkBorder),
            },
          }}
          defaultChecked
        />
      }
      label={label}
      {...rest}
      sx={[
        {
          "& .MuiFormControlLabel-label": {
            fontSize: "14px",
            fontWeight: 400,
            color: (theme) => theme.palette.text.titleLabel,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
