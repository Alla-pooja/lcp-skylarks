import { Box, useTheme } from "@mui/material";
// import AudioCard from "./AudioCard";
import AudioLoader from "./AudioLoader";
import ImageLoader from "./ImageLoader";
import PublicationLoader from "./PublicationLoader";

interface CardProps {
  drawerOpen: boolean;
  type: string;
  count: number;
}

export default function ContentUILoader({ drawerOpen, type, count }: CardProps) {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 4fr)" width="100%" gap={2}>
          {[...Array(count)].map((e, i) => (
            <Box
              key={`loader-${i}`}
              gridColumn={{ xs: "span 12", sm: drawerOpen ? "span 12" : "span 6", lg: drawerOpen ? "span 6" : "span 4", xl: "span 4" }}
              display={"flex"}
              sx={{ background: theme.palette.background.loaderBgColor, borderRadius: 2, p: type === "image" ? 0 : 2 }}
            >
              {type === "publication" && <PublicationLoader />}
              {["image", "video"].includes(type) && <ImageLoader />}
              {type === "audio" && <AudioLoader />}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
