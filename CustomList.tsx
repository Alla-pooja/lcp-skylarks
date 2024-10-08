import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { IconButton, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SxProps, Theme } from "@mui/material/styles";
import CustomDivider from "./CustomDivider";
import Classes from "./Scrollbar.module.css";

export interface ListItemType {
  id: string;
  name: string;
  url: string;
}
interface CustomListProps {
  databaseList: ListItemType[];
  getSelectedDatabase: (database: ListItemType | null) => void;
  sx?: SxProps<Theme>;
}
export default function CustomList({ databaseList, getSelectedDatabase, sx }: CustomListProps) {
  const theme = useTheme();
  const handleSelect = (value: ListItemType) => {
    getSelectedDatabase(value);
  };

  return (
    <List
      dense
      className={Classes.scroll_dark}
      sx={{
        width: "100%",
        p: 1,
        bgcolor: "background.paper",
        borderRadius: "8px",
        border: theme.palette.dashboardContainer.customListBorder,
        background: theme.palette.background.gradientLight1,
        ...sx,
      }}
    >
      {databaseList.map((database) => {
        const labelId = `list-secondary-label-${database.name}`;
        return (
          <>
            <ListItem
              key={database.id}
              secondaryAction={
                <IconButton aria-label="select" onClick={() => handleSelect(database)} color="primary">
                  <KeyboardArrowRightIcon />
                </IconButton>
              }
              sx={{
                ".css-1164moy-MuiButtonBase-root-MuiListItemButton-root:hover": {
                  backgroundColor: "transparent",
                },
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="database_icon" src={`/assets/database_icon.png`} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${database.name}`} />
              </ListItemButton>
            </ListItem>
            <CustomDivider sx={{ width: "96%" }} />
          </>
        );
      })}
    </List>
  );
}
