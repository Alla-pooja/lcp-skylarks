import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { routes } from "../routes";
import { useHandleRouteClick } from "../routes/hooks";
import CustomDivider from "./CustomDivider";
import CustomIconButton from "./CustomIconButton";
import CustomPopover from "./CustomPopover";
import CustomSwitch from "./CustomSwitch";
import CustomTextButton from "./CustomTextButton";
import QueryCardKeyValueText from "./QueryCardKeyValueText";

export interface QueryCardDataType {
  id: number | string;
  isLiveMonitoring: boolean;
  dataSource: string;
  aiModels: string;
  resultsCount: number;
  daetime: Date;
  keywords?: string[];
  pipeline_id: string;
  responsibilities?: string[];
  text?: string;
  role?: string;
  _id: string;
}

export interface QueryCardProps {
  data: QueryCardDataType;
  isFavorite?: boolean;
  isHistory?: boolean;
  liveMonitoring?: boolean;
  handleDeleteFromFavorites?: (value?: any) => any;
  handleSaveToFavorites?: (value?: any) => any;
  handleDeleteFromHistory?: (value?: any) => any;
}

// As data coming from backend is not correct, for old queries it is giving
// `Keywords` and `responsibilities` fields and for new queries it is giving
// `Text` and `Role` fields, so as of now doing workaround to show data.
export default function QueryCard({
  data,
  isFavorite = false,
  isHistory = false,
  liveMonitoring = false,
  handleDeleteFromFavorites = () => {},
  handleSaveToFavorites = () => {},
  handleDeleteFromHistory = () => {},
}: QueryCardProps) {
  const theme = useTheme();
  const handleRouteClick = useHandleRouteClick();

  const [expandDetails, setExpandDetails] = React.useState(false);
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [toggle, setToggle] = useState(data?.isLiveMonitoring);

  const toggleExpandDetails = () => {
    setExpandDetails((prev) => !prev);
  };

  const handleOpenMoreOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreOptionsAnchorEl(event.currentTarget);
  };

  const handleCloseMoreOptions = () => {
    setMoreOptionsAnchorEl(null);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleQueryClick = () => {
    handleRouteClick(`${routes.home.path}?tab=home&page=overview&query=${data?._id}`);
  };

  const dataSources = data?.keywords?.toString()?.split(",")?.join(", ");
  const aiModels = data?.responsibilities?.toString()?.split(",")?.join(", ");

  return (
    <Box
      sx={{
        borderRadius: 1,
        border: `1px solid ${theme.palette.additionalColors.border}`,
        background: theme.palette.background.default,
        p: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "nowrap", alignItems: "center" }}>
            <Box
              onClick={handleQueryClick}
              sx={{
                background: theme.palette.primary.dark,
                padding: "8px 10px",
                borderRadius: 1,
                width: "fit-content",
                cursor: "pointer",
              }}
            >
              <Typography variant="body3" color={theme.palette.primary.light}>
                Query:&nbsp;
              </Typography>
              <Typography variant="body3" color={theme.palette.text.secondary} fontWeight={600}>
                {data?.text ? data?.text : data?.keywords?.join(", ")}
              </Typography>
            </Box>
            {/* <Typography variant="caption" color={theme.palette.additionalColors.light}>
              {formatDateTimeIntoCurrentTimeZone(data.daetime)}
            </Typography> */}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "nowrap", alignItems: "center", justifyContent: "flex-end" }}>
            {liveMonitoring && (
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body4"
                  sx={{
                    color: theme.palette.text.titleLabel,
                  }}
                >
                  Live Monitoring
                </Typography>
                <CustomSwitch name="theme" onChange={handleToggle} checked={toggle} />
              </Stack>
            )}
            <Box
              sx={{
                borderRadius: 1,
                border: `1px solid ${theme.palette.additionalColors.border}`,
                background: theme.palette.background.darkSecondary,
                padding: "8px 12px",
              }}
            >
              <Typography variant="subtitle1" color={theme.palette.text.main}>
                {toggle ? `2672 Results / 45 New` : `2672 Results`}
              </Typography>
            </Box>
            <Box>
              <CustomIconButton onClick={handleOpenMoreOptions} sx={{ color: theme.palette.text.default }}>
                <BsThreeDots />
              </CustomIconButton>
              <CustomPopover open={Boolean(moreOptionsAnchorEl)} anchorEl={moreOptionsAnchorEl} onClose={handleCloseMoreOptions}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    "&>.MuiButtonBase-root": {
                      justifyContent: "start",
                      textAlign: "start",
                    },
                  }}
                >
                  {isFavorite && (
                    <CustomTextButton onClick={() => handleDeleteFromFavorites()} startIcon={<CloseIcon color="error" />}>
                      Delete from favorites
                    </CustomTextButton>
                  )}
                  {isHistory && (
                    <>
                      <CustomTextButton onClick={() => handleSaveToFavorites()} startIcon={<AiOutlineStar color="primary" />}>
                        Save to the favorites
                      </CustomTextButton>
                      <CustomDivider width="100%" />
                      <CustomTextButton onClick={() => handleDeleteFromHistory()} startIcon={<CloseIcon color="error" />}>
                        Delete from history
                      </CustomTextButton>
                    </>
                  )}
                </Box>
              </CustomPopover>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <QueryCardKeyValueText keyName={"Data Source"} value={data?.keywords ? dataSources : data?.text} />
          <QueryCardKeyValueText keyName={"AI Models"} value={data?.responsibilities ? aiModels : data?.role} />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <CustomTextButton onClick={toggleExpandDetails}>Details {expandDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}</CustomTextButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {expandDetails && (
            <Box>
              <CustomDivider />
              <Grid container mt={1}>
                <Grid item xs={12} lg={6} py={0}>
                  <QueryCardKeyValueText keyName={"Data Source"} value={data?.keywords ? dataSources : data?.text} />
                </Grid>
                <Grid item xs={12} lg={6} py={0}>
                  <QueryCardKeyValueText keyName={"Data Source"} value={data?.keywords ? dataSources : data?.text} />
                </Grid>
                <Grid item xs={12} lg={6} py={0}>
                  <QueryCardKeyValueText keyName={"Data Source"} value={data?.keywords ? dataSources : data?.text} />
                </Grid>
                <Grid item xs={12} lg={6} py={0}>
                  <QueryCardKeyValueText keyName={"Data Source"} value={data?.keywords ? dataSources : data?.text} />
                </Grid>
                <Grid item xs={12} lg={6} py={0}>
                  <QueryCardKeyValueText keyName={"Data Source"} value={data?.keywords ? dataSources : data?.text} />
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
