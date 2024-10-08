import BusinessIcon from "@mui/icons-material/Business";
import EventIcon from "@mui/icons-material/Event";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Person from "@mui/icons-material/Person";
import TopicIcon from "@mui/icons-material/Topic";
import { Box, Typography } from "@mui/material";

interface CustomImageNodeProps {
  color: string | undefined;
  legend: string;
  label?: string;
  icon?: boolean;
  count?: number;
}

export default function CustomImageNode({ color, label, legend, icon = true, count }: CustomImageNodeProps) {
  const width = count && count.toString().length > 2 ? "60px" : "30px";

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${color}66`,
          border: `1px solid ${color}`,
          width: width,
          height: width,
          borderRadius: "50%",
          padding: "5px",
        }}
        className="marker"
      >
        {icon ? (
          <>
            {legend === "person" && <Person sx={{ fontSize: "20px" }} className="marker-icon" />}
            {legend === "organization" && <BusinessIcon sx={{ fontSize: "20px" }} className="marker-icon" />}
            {legend === "event" && <EventIcon sx={{ fontSize: "20px" }} className="marker-icon" />}
            {legend === "location" && <FmdGoodIcon sx={{ fontSize: "20px" }} className="marker-icon" />}
            {legend === "topic" && <TopicIcon sx={{ fontSize: "20px" }} className="marker-icon" />}
          </>
        ) : (
          <Typography>{count}</Typography>
        )}
      </Box>
      {label && <Typography className="marker-label">{label}</Typography>}
    </Box>
  );
}
