import { Box, Paper, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import CardTitle from "./CardTitle";

export interface TabRecord {
  id: string | number;
  title: string;
  disabled?: boolean;
  component: React.ReactNode;
}

export interface TabLayoutProps {
  children?: React.ReactNode;
  tabs: TabRecord[];
  activeTab?: string | number;
  sx?: SxProps<Theme>;
  handleActiveTab: (tab: any) => void;
  width?: string;
  height?: string;
}
export default function CustomTab({ width, height, children, tabs, handleActiveTab, sx, activeTab }: TabLayoutProps) {
  const theme = useTheme();

  const handleChangeActiveTab = (tabId: string | number) => {
    const tab = tabs.find((tab) => tab.id === tabId) || tabs[0];
    handleActiveTab(tab?.id);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ background: theme.palette.text.secondaryText, boxShadow: theme.palette.background.primaryShadow, ...sx }}
      >
        {tabs.map((tab) => {
          return (
            <React.Fragment key={tab.id}>
              <Paper
                onClick={() => {
                  handleChangeActiveTab(tab.id);
                }}
                sx={{
                  cursor: activeTab === tab.id ? "default" : "pointer",
                  color: theme.palette.text.secondaryText,
                  background: activeTab === tab.id ? theme.palette.background.secondaryBgColor : "transparent",
                  borderRadius: "3px",
                  px: 1,
                  py: 1,
                  width: width || "128px",
                  position: "relative",
                  boxShadow: "none",
                  height: height || "28px",
                }}
              >
                <CardTitle
                  isOpen={activeTab === tab.id}
                  title={tab.title}
                  sx={{
                    ...theme.typography.body4,
                    lineHeight: "16px",
                    color: activeTab === tab.id ? theme.palette.text.secondaryText : theme.palette.additionalColors.light,
                    textAlign: "center",
                  }}
                />
              </Paper>
            </React.Fragment>
          );
        })}
      </Box>
    </>
  );
}
