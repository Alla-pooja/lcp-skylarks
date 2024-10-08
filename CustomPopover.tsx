import { Popover, PopoverProps, useTheme } from "@mui/material";

export default function CustomPopover({ children, ...rest }: PopoverProps) {
  const theme = useTheme();

  return (
    <Popover
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            background: theme.palette.background.gradientLight1,
            filter: theme.palette.background.popoverDropshadow,
            border: `1px solid ${theme.palette.additionalColors.border}`,
            p: 2,
            mt: 0.5,
            borderRadius: 1,
            // ...rest?.slotProps?.paper?.sx,
          },
        },
      }}
      {...rest}
    >
      {children}
    </Popover>
  );
}
