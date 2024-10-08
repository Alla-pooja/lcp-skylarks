import { IconButton } from "@mui/material";
import { SxProps, Theme, useTheme } from "@mui/material/styles";

interface CustomCloseIconButtonProps {
  children?: React.ReactNode;
  sx: SxProps<Theme>;
  [x: string]: any;
}

const CustomCloseIconButton: React.FC<CustomCloseIconButtonProps> = ({ children, sx, ...props }) => {
  const theme = useTheme();

  return (
    <IconButton
      sx={{
        border: `0.5px solid ${theme.palette.additionalColors.border}`,
        background: theme.palette.dashboardContainer.closeButtonColor,
        boxShadow: theme.palette.dashboardContainer.closeButtonBoxShadow,
        "&:hover": {
          background: theme.palette.background.secondaryGradient,
          boxShadow: theme.palette.dashboardContainer.closeButtonBoxShadow,
        },
        "&:active": {
          background: theme.palette.dashboardContainer.closeButtonColor,
          boxShadow: theme.palette.dashboardContainer.customButtonActiveBoxShadow,
        },
        "&:disabled": {
          background: theme.palette.action.disabled,
          color: theme.palette.background.dark,
        },
        borderRadius: "3px",
        minWidth: theme.spacing(3),
        width: theme.spacing(3),
        height: theme.spacing(3),
        padding: "6px",
        color: theme.palette.error.main,
        ...sx,
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};

export default CustomCloseIconButton;
