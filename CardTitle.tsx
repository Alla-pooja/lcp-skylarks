import { Typography, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface CardTitleProps {
  isOpen?: boolean;
  title: string;
  sx?: SxProps<Theme>;
}

const CardTitle: React.FC<CardTitleProps> = ({ isOpen = true, title = "", sx }) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        fontSize: "22px",
        fontWeight: "600",
        color: isOpen ? theme.palette.dashboardContainer.cardTitleColorActive : theme.palette.dashboardContainer.cardTitleColor,
        position: "relative",
        zIndex: "20",
        lineHeight: "20px",
        ...sx,
      }}
    >
      {title}
    </Typography>
  );
};

export default CardTitle;
