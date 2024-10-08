import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: `${theme.palette.background.dark}`,
    color: theme.palette.text.secondary,
    maxWidth: 220,
    border: `1px solid ${theme.palette.additionalColors.border}`,
  },
}));

export default CustomTooltip;
