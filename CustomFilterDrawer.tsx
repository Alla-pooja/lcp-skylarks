import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import DateRange from "../pages/analysis/Components/Feed/components/Filters/DateRangeOptions";
import EntitiesOptions from "../pages/analysis/Components/Feed/components/Filters/EntitiesOptions";
import FilterMultiSelect from "../pages/analysis/Components/Feed/components/Filters/FilterMultiSelect";
import Keywords from "../pages/analysis/Components/Feed/components/Filters/Keywords";
import Language from "../pages/analysis/Components/Feed/components/Filters/Language";
import RiskScore from "../pages/analysis/Components/Feed/components/Filters/RiskScore";
import { DATA_SOURCES, RegionFilterOption, RiskFactor, SOCIAL_MEDIA_DATA_SOURCES } from "../utils/constants";
import { MultiSelectValueType } from "./CheckboxFilterButton";
import CustomIconButton from "./CustomIconButton";
import CustomStatus from "./CustomStatus";
import CustomSubFilterDrawer from "./CustomSubFilterDrawer";

interface PlayCamerasDrawerProps {
  filterData?: any;
  openDrawer: boolean;
  closePlayCamerasDrawer: () => void;
  title?: string;
  handleFilterApply(data: any): void;
  handleReset(data: any): void;
}

export interface FilterOptions {
  id: string | number;
  text: string;
}

export interface SubFilterOptions {
  title: string;
  entities: MultiSelectValueType[];
  options: string[];
}

const CustomFilterDrawer: FC<PlayCamerasDrawerProps> = ({ filterData, closePlayCamerasDrawer, title, handleReset, handleFilterApply }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>(filterData?.dateRange || "");
  const [subEntity, setSubEntity] = useState(filterData?.subEntity || []);
  const [demographics, setDemographics] = useState<string[]>(filterData?.demographics || []);
  const [dataSource, setDataSource] = useState<string[]>(filterData?.dataSource || []);
  const [riskFactor, setRiskFactor] = useState<string[]>(filterData?.riskFactor || []);
  const [sentiment, setSentiment] = useState<string[]>(filterData?.sentiment || []);
  const [sourceType, setSourceType] = useState<string[]>(filterData?.sourceType || []);
  const [keywords, setKeywords] = useState<string[]>(filterData?.keywords || []);
  const [riskScore, setRiskScore] = useState<string[]>(filterData?.riskScore || []);
  const [language, setLanguage] = useState<string>(filterData?.language || "");
  const [isReset, setReset] = useState<boolean>(false);
  const [subFilterData, setSubFilterData] = useState<SubFilterOptions>({ title: "", entities: [], options: [] });

  const getDateRange = (data: string) => {
    setDateRange(data);
  };
  const getSubFilterData = (data: any) => {
    setSubEntity(data);
  };

  const handleOpenEntities = () => {
    setOpenDrawer(true);
  };
  const handleCloseEntities = () => {
    setOpenDrawer(false);
  };

  const getSubEntities = (title: string, entities: MultiSelectValueType[], options: string[]) => {
    setSubFilterData({ title, entities, options });
  };

  const getKeywords = (data: string[]) => {
    setKeywords(data);
  };

  const getRiskScore = (values: string[]) => {
    setRiskScore(values);
  };

  const getLanguage = (value: string) => {
    setLanguage(value);
  };

  const handleResetFilter = () => {
    if (handleReset) {
      handleReset({});
    }
    setReset((prev) => true);
  };

  useEffect(() => {
    if (isReset) {
      setReset(false);
    }
  }, [isReset]);

  const handleApply = () => {
    const filterData = {
      dateRange: dateRange,
      subEntity: subEntity,
      demographics: demographics,
      dataSource: dataSource,
      riskFactor: riskFactor,
      sentiment: sentiment,
      sourceType: sourceType,
      keywords: keywords,
      riskScore: riskScore,
      language: language,
    };
    handleFilterApply(filterData);
    closePlayCamerasDrawer();
  };

  return (
    <Box
      sx={{
        width: {
          width: { sm: "100%", lg: "25%" },
          zIndex: 1210,
        },
        height: "auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        borderRight: "none",
        px: 2,
        background: theme.palette.background.darkCardBackground,
        border: theme.palette.additionalColors.databasecardBorder,
        borderRadius: 2,
      }}
    >
      <CustomIconButton sx={{ position: "absolute", right: "-10px", top: "50px" }} onClick={closePlayCamerasDrawer}>
        {openDrawer ? (
          <ChevronLeftIcon sx={{ color: theme.palette.text.default }} />
        ) : (
          <ChevronRightIcon sx={{ color: theme.palette.text.default }} />
        )}
      </CustomIconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: (theme) => theme.spacing(2),
        }}
      >
        <Typography variant="h2">{title ? title : "Filters"}</Typography>
      </Box>
      <Box>
        <DateRange getDateRange={getDateRange} isReset={isReset} selectedValue={filterData?.dateRange || dateRange} />
        <EntitiesOptions handleOpenEntities={handleOpenEntities} getSubEntities={getSubEntities} />
        <FilterMultiSelect
          title="Demographics"
          placeholder="Select Regions"
          options={RegionFilterOption}
          getValues={(values) => setDemographics(values)}
          isReset={isReset}
          selectedValue={filterData?.demographics}
        />
        <Language selectedValue={filterData?.language} isReset={isReset} getLanguage={getLanguage} />
        <FilterMultiSelect
          title="Data Source"
          placeholder="Select data sources"
          options={SOCIAL_MEDIA_DATA_SOURCES}
          getValues={(values) => setDataSource(values)}
          isReset={isReset}
          selectedValue={filterData?.dataSource}
        />
        <Keywords isReset={isReset} getKeywords={getKeywords} selectedValue={filterData?.keywords} />
      </Box>
      <Box mt={4}>
        <Box
          display="flex"
          sx={{
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          }}
        >
          <Typography>Additional Filters</Typography>
          <CustomStatus label="AI-powered" status="neutral" sx={{ height: "20px", borderRadius: 11, ml: "auto" }} />
        </Box>
        <RiskScore isReset={isReset} getRiskScore={getRiskScore} selectedValue={filterData?.riskScore} />
        <FilterMultiSelect
          title="Risk Factor"
          placeholder="Select one or several factors"
          options={RiskFactor}
          getValues={(values) => setRiskFactor(values)}
          isReset={isReset}
          selectedValue={filterData?.riskFactor}
        />
        <FilterMultiSelect
          title="Sentiment"
          placeholder="Select sentiment"
          options={SOCIAL_MEDIA_DATA_SOURCES}
          getValues={(values) => setSentiment(values)}
          isReset={isReset}
          selectedValue={filterData?.sentiment}
        />
        <FilterMultiSelect
          title="Source type"
          placeholder="Select source type"
          options={DATA_SOURCES}
          getValues={(values) => setSourceType(values)}
          isReset={isReset}
          selectedValue={filterData?.sourceType}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "auto",
          gap: 2.5,
          marginBottom: (theme) => theme.spacing(3),
        }}
      >
        <Button
          variant="text"
          size="medium"
          sx={(theme) => ({
            ...theme.typography.bigButton,
            width: "90%",
            mt: 5,
            borderColor: "#404040",
            "&:active": {
              backgroundColor: "transparent",
            },
          })}
          onClick={handleResetFilter}
        >
          <CloseIcon sx={{ width: "18px", height: "18px", mt: "-3px", mr: "5px" }} />
          Reset Filter
        </Button>
        <Button
          variant="contained"
          size="medium"
          onClick={handleApply}
          sx={(theme) => ({
            ...theme.typography.bigButton,
            color: theme.palette.background.default,
            width: "90%",
            borderColor: "#404040",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
            "&:active": {
              backgroundColor: theme.palette.action.active,
              boxShadow: "inset 0px 4px 6px rgba(1, 19, 35, 0.4)",
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.action.disabled,
              color: theme.palette.background.default,
            },
          })}
        >
          Apply
        </Button>
        <Button
          variant="text"
          size="medium"
          sx={(theme) => ({
            ...theme.typography.bigButton,
            width: "90%",
            borderColor: "#404040",
            "&:active": {
              backgroundColor: "transparent",
            },
          })}
          onClick={handleResetFilter}
        >
          <StarOutlineIcon sx={{ width: "18px", height: "18px", mt: "-3px", mr: "5px" }} />
          Save query to favorites
        </Button>
      </Box>
      {openDrawer && (
        <CustomSubFilterDrawer
          openDrawer={openDrawer}
          closePlayCamerasDrawer={handleCloseEntities}
          getFilterData={getSubFilterData}
          isReset={isReset}
          selectedValue={filterData?.subEntity}
          subFilterData={subFilterData}
        />
      )}
    </Box>
  );
};

export default CustomFilterDrawer;
