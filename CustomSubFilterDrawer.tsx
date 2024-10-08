import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import TopicIcon from "@mui/icons-material/Topic";
import { Box, Checkbox, InputAdornment, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { EntitySubType, Persons } from "../utils/constants";
import { sxCheckbox } from "../utils/sxStyle";
import { MultiSelectValueType } from "./CheckboxFilterButton";
import CustomCloseIconButton from "./CustomCloseIconButton";
import CustomDivider from "./CustomDivider";
import CustomInputField from "./CustomInputField";
import CustomTextButton from "./CustomTextButton";

interface PlayCamerasDrawerProps {
  selectedValue: {
    [x: string]: { entities: string[]; persons: string[] };
  };
  subFilterData: {
    title: string;
    entities: MultiSelectValueType[];
    options: string[];
  };
  openDrawer: boolean;
  closePlayCamerasDrawer: () => void;
  playCameras?: (cameras: any, buildings?: any) => void;
  isLivePage?: boolean;
  isFilterDrawer?: boolean;
  cameraData?: any[];
  buildingData?: any[];
  floorData?: any[];
  title?: string;
  playBtnText?: string;
  isReset?: boolean;
  resetFilter?: () => void;
  getFilterData(data: any): void;
}

export interface FilterOptions {
  id: string | number;
  text: string;
}

const CustomSubFilterDrawer: FC<PlayCamerasDrawerProps> = ({ selectedValue, isReset, subFilterData, closePlayCamerasDrawer, getFilterData }) => {
  const theme = useTheme();
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleChange = (e: string) => {
    if (!isIncludedInSelectedItems(selectedEntities, e)) {
      if (e === "All") {
        setSelectedEntities(EntitySubType.map((data) => data.text));
      } else {
        setSelectedEntities((prev) => [...prev, e]);
      }
    } else {
      if (e === "All") {
        setSelectedEntities([]);
      } else {
        let finalValues = selectedEntities.filter((data: string) => data !== e);
        setSelectedEntities(finalValues);
      }
    }
  };

  const handlePersonSelection = (e: string) => {
    if (!isIncludedInSelectedItems(selectedPersons, e)) {
      if (e === "All") {
        setSelectedPersons(Persons.map((data) => data));
      } else {
        setSelectedPersons((prev) => [...prev, e]);
      }
    } else {
      if (e === "All") {
        setSelectedPersons([]);
      } else {
        let finalValues = selectedPersons.filter((data: string) => data !== e);
        setSelectedPersons(finalValues);
      }
    }
  };

  const handleClose = () => {
    closePlayCamerasDrawer();
  };

  const handleSubReset = () => {
    setSelectedEntities([]);
    setSelectedPersons([]);
  };

  useEffect(() => {
    const key = subFilterData["title"].toLowerCase();
    getFilterData({ ...selectedValue, [key]: { entities: selectedEntities, persons: selectedPersons } });
  }, [selectedEntities, selectedPersons]);

  useEffect(() => {
    if (isReset) {
      setSelectedEntities([]);
      setSelectedPersons([]);
    }
  }, [isReset]);

  useEffect(() => {
    if (selectedValue) {
      const key: string = subFilterData["title"].toLowerCase();
      setSelectedEntities(selectedValue[key]?.entities || []);
      setSelectedPersons(selectedValue[key]?.persons || []);
    }
  }, [selectedValue, subFilterData?.title]);

  const icon = () => (
    <>
      {subFilterData?.title === "Persons" && <PersonIcon sx={{ color: theme.palette.text.tableHeader, fontSize: "18px" }} />}
      {subFilterData?.title === "Organizations" && <BusinessIcon sx={{ color: theme.palette.text.tableHeader, fontSize: "18px" }} />}
      {subFilterData?.title === "Topics" && <TopicIcon sx={{ color: theme.palette.text.tableHeader, fontSize: "18px" }} />}
      {subFilterData?.title === "Locations" && <PlaceIcon sx={{ color: theme.palette.text.tableHeader, fontSize: "18px" }} />}
      {subFilterData?.title === "Events" && <CalendarTodayIcon sx={{ color: theme.palette.text.tableHeader, fontSize: "18px" }} />}
    </>
  );

  const isIncludedInSelectedItems = (items: string[], val: string): boolean => {
    return items.includes(val);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        zIndex: -1,
        flexDirection: "column",
        left: "100%",
        borderRight: "none",
        paddingLeft: 2,
        paddingRight: 2,
        background: theme.palette.background.darkCardBackground,
        border: theme.palette.additionalColors.databasecardBorder,
        boxShadow: theme.palette.dashboardContainer.subfilterDrawerBoxShadow,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          pt: 2,
          gap: 0.5,
        }}
      >
        {icon()}
        <Typography variant="h4" fontWeight={500} pt={0.2}>
          {subFilterData?.title} ({subFilterData?.options.length})
        </Typography>
        <CustomCloseIconButton onClick={handleClose} sx={{ ml: "auto" }}>
          <CloseIcon sx={{ width: "16px", height: "16px" }} />
        </CustomCloseIconButton>
      </Box>
      <Box>
        <CustomTextButton sx={{ textAlign: "left" }} onClick={handleSubReset}>
          <ReplayIcon sx={{ color: theme.palette.text.default, transform: "rotate(-80deg)", fontSize: "16px", mr: 0.5, mt: "-3px" }} />
          Reset
        </CustomTextButton>
        <CustomInputField
          placeholder="Search"
          size="small"
          variant="outlined"
          autoComplete="off"
          onChange={handleSearch}
          sx={{
            width: "100%",
            "&.MuiFormControl-root.MuiTextField-root .MuiInputBase-root": {
              height: "36px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box mt={2} mb={1}>
        <Typography variant="h4" color={theme.palette.text.tableHeader}>
          Entity subtypes
        </Typography>
        <Box>
          {subFilterData?.entities?.map((entity, idx: number) => (
            <Box key={`entity-${idx}`} display="flex" onClick={() => handleChange(entity?.text)}>
              <Checkbox
                checked={isIncludedInSelectedItems(selectedEntities, entity.text)}
                sx={sxCheckbox(isIncludedInSelectedItems(selectedEntities, entity.text))}
                disableRipple
              />
              <Typography variant="body4" mt={2} color={theme.palette.text.titleLabel}>
                {entity?.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <CustomDivider width="100%" />
      <Typography variant="h4" color={theme.palette.text.tableHeader} mt={2}>
        {subFilterData?.title}
      </Typography>
      <Box mt={2} height="100%" overflow={"scroll"}>
        {subFilterData?.options?.map((person: string, idx: number) => (
          <Box key={`person-${idx}`} display="flex" onClick={() => handlePersonSelection(person)}>
            <Checkbox
              checked={isIncludedInSelectedItems(selectedPersons, person)}
              sx={sxCheckbox(isIncludedInSelectedItems(selectedPersons, person))}
              disableRipple
            />
            <Typography variant="body4" mt={2} color={theme.palette.text.titleLabel}>
              {person}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomSubFilterDrawer;
