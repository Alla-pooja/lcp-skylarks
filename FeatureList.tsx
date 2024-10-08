import { List, ListItem, Typography, useTheme } from "@mui/material";
import { BsCheck } from "react-icons/bs";

interface ListItemProps {
  features: string[];
}

export default function FeatureList({ features }: ListItemProps) {
  const theme = useTheme();

  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {features.map((list, idx) => (
        <ListItem sx={{ p: 0 }} key={`list-${idx}`}>
          <BsCheck size={24} color={theme.palette.text.default} />
          <Typography variant="body6" px={0.5} sx={{ color: theme.palette.text.titleLabel }}>
            {list}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
