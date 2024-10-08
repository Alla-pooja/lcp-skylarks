import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export interface PrimaryLoadingButtonProps extends LoadingButtonProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  isLoading?: boolean;
  isDisabled?: boolean;
  [x: string]: any;
}

const PrimaryLoadingButton: React.FC<PrimaryLoadingButtonProps> = ({ sx, children, isDisabled = false, isLoading = false, ...rest }) => {
  const theme = useTheme();

  return (
    <LoadingButton
      type="submit"
      disabled={isDisabled}
      disableRipple
      variant="contained"
      endIcon={<></>}
      loading={isLoading}
      loadingPosition="end"
      sx={{
        ...theme.typography.hugeButton, //adjust as required in component sx
        borderRadius: "4px",
        border: theme.palette.dashboardContainer.buttonBorder,
        background: theme.palette.primary.main,
        boxShadow: theme.palette.button.primaryButton.boxShadow,
        "& .MuiButton-endIcon": {
          mr: "-8px",
        },
        "&:hover": {
          background: theme.palette.primary.light,
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        "&:active": {
          background: theme.palette.action.active,
          boxShadow: "0px 4px 6px 0px rgba(1, 19, 35, 0.40) inset",
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        "&.Mui-disabled": {
          background: theme.palette.action.disabled,
          color: theme.palette.background.default,
          border: theme.palette.dashboardContainer.buttonBorder,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export default PrimaryLoadingButton;
