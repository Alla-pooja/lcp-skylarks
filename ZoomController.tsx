import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

export interface ZoomControllerProps {
  zoomOut: () => void;
  zoomIn: () => void;
  sx?: SxProps<Theme>;
  [x: string]: any;
}

const controllerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "35px",
  height: "35px",
};

const ZoomController = ({ zoomOut, zoomIn, sx, ...rest }: ZoomControllerProps) => {
  const theme = useTheme();

  const handleZoomOut = () => {
    zoomOut();
  };
  const handleZoomIn = () => {
    zoomIn();
  };

  return (
    <Box
      sx={{
        ...sx,
        background: theme.palette.dashboardContainer.closeButtonColor,
        border: theme.palette.dashboardContainer.buttonBorder,
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          ...controllerStyle,
          borderBottom: "2px solid",
          borderImage: `radial-gradient(${theme.palette.primary.main}, transparent) 1`,
        }}
        onClick={handleZoomOut}
      >
        <AddIcon sx={{ color: theme.palette.primary.main }} />
      </Box>

      <Box sx={controllerStyle} onClick={handleZoomIn}>
        <RemoveIcon sx={{ color: theme.palette.primary.main }} />
      </Box>
    </Box>
  );
};

export default ZoomController;
