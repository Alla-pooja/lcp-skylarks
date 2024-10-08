import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import TopicIcon from "@mui/icons-material/Topic";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  capitalize,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Classes from "../components/Scrollbar.module.css";
import { sxTableCell, sxTableCellBody } from "../utils/sxStyle";

interface RiskScoreOptions {
  [x: string]: any;
}

interface RiskScoreProps {
  tableData: RiskScoreOptions[];
  header: { id: string; label: string; searchEnable: boolean; type?: string; customIcon?: boolean; minWidth?: number }[];
  rows: number;
  pagination?: boolean;
  search?: boolean;
  handleClick?(details: any): void | undefined;
}

export default function CustomTable({ tableData, header, rows, pagination, search, handleClick }: RiskScoreProps) {
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({});
  const [capitalizedData, setCapitalizedData] = useState<RiskScoreOptions[]>([]);

  const handlePageChange = (e: any, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (columnId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValues((prevSearchValues) => ({
      ...prevSearchValues,
      [columnId]: value,
    }));
  };

  useEffect(() => {
    const filteredData = tableData.filter((row: any) =>
      header.every((column) => {
        const searchValue = searchValues[column.id] || "";
        if (searchValue !== "") {
          return row[column.id]?.toLowerCase().includes(searchValue?.toLowerCase());
        } else {
          return row;
        }
      })
    );

    const capitalizedData = filteredData.map((row) => {
      const updatedRow: any = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          updatedRow[key] = typeof row[key] === "string" ? capitalize(row[key]) : row[key];
        }
      }
      return updatedRow;
    });
    setCapitalizedData(capitalizedData);
  }, [tableData, searchValues, header]);

  const btnStyle = (status: string) => {
    let statusField = status.toLowerCase();
    switch (statusField) {
      case "high":
        return {
          background: theme.palette.dashboardContainer.highStatusBg,
          color: theme.palette.text.highStatus,
          border: `1px solid ${theme.palette.text.highStatus}`,
        };
      case "neutral":
        return {
          background: theme.palette.dashboardContainer.neutralStatusBg,
          color: theme.palette.text.neutralStatus,
          border: `1px solid ${theme.palette.text.neutralStatus}`,
        };
      case "moderate":
        return {
          background: theme.palette.dashboardContainer.moderateStatusBg,
          color: theme.palette.text.moderateStatus,
          border: `1px solid ${theme.palette.text.moderateStatus}`,
        };
      case "extreme":
        return {
          background: theme.palette.dashboardContainer.extremeStatusBg,
          color: theme.palette.text.extremeStatus,
          border: `1px solid ${theme.palette.text.extremeStatus}`,
        };
      case "low":
        return {
          background: theme.palette.dashboardContainer.lightBgButton,
          color: theme.palette.text.lowStatus,
          border: `1px solid ${theme.palette.text.lowStatus}`,
        };
      case "default":
        break;
    }
  };

  const rowHandler = (row: any) => {
    if (handleClick) handleClick(row);
  };

  const iconStyle = {
    color: theme.palette.text.tableHeader,
    fontSize: "20px",
  };

  const CustomIcon = (type: string) => {
    return (
      <Box
        sx={{
          width: "35px",
          minWidth: "35px",
          height: "35px",
          borderRadius: "50%",
          background: theme.palette.primary.tertiaryGradient,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {type === "Person" && <PersonIcon sx={iconStyle} />}
        {type === "Event" && <CalendarTodayIcon sx={iconStyle} />}
        {type === "Topic" && <TopicIcon sx={iconStyle} />}
        {type === "Organization" && <BusinessIcon sx={iconStyle} />}
        {type === "Location" && <PlaceIcon sx={iconStyle} />}
      </Box>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          background: theme.palette.background.darkCardBackground,
          border: theme.palette.additionalColors.databasecardBorder,
          px: 2,
          borderRadius: "8px",
        }}
      >
        <TableContainer sx={{ width: "100%", mb: 2 }} className={Classes.scroll_dark}>
          <Table stickyHeader aria-label="sticky table" sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}>
            <TableHead>
              <TableRow sx={{ fontSize: "14px" }}>
                {header.map((column, idx) => {
                  return (
                    <TableCell sx={{ ...sxTableCell, minWidth: column?.minWidth }} key={`gaurd-${idx}`}>
                      {column?.label}
                      <br />
                      {search && (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={searchValues[column.id] || ""}
                          onChange={handleSearchChange(column.id)}
                          sx={{
                            "& .MuiOutlinedInput-input": {
                              padding: 0,
                              border: `1px solid ${theme.palette.text.tableHeader}`,
                              borderRadius: "4px",
                            },
                          }}
                          disabled={!column?.searchEnable}
                          InputProps={{
                            sx: {
                              "&:hover fieldset": {
                                border: `1px solid ${theme.palette.text.tableHeader}!important`,
                              },
                              "&:focus-within fieldset, &:focus-visible fieldset": {
                                border: `1px solid ${theme.palette.text.tableHeader}!important`,
                              },
                            },
                          }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {capitalizedData &&
                capitalizedData.length > 0 &&
                capitalizedData.slice((page - 1) * rows, page * rows).map((row: any, idx) => (
                  <TableRow key={`tableData-${idx}`} onClick={() => rowHandler(row)}>
                    {header.map((column) => {
                      let btnStyleData = column?.type === "button" && btnStyle(row[column.id]);
                      return (
                        <TableCell sx={{ ...sxTableCellBody, color: theme.palette.text.titleLabel }} key={column.id}>
                          {column?.type ? (
                            <Button
                              sx={{
                                textTransform: "capitalize",
                                ...btnStyleData,
                                width: "88px",
                                height: "24px",
                              }}
                            >
                              {row[column.id]}
                            </Button>
                          ) : column?.customIcon ? (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                              }}
                            >
                              {CustomIcon(row?.type)}
                              <span style={{ marginTop: "10px" }}>{row[column.id]}</span>
                            </Box>
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              {capitalizedData && capitalizedData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={Object.keys(header).length}
                    align="center"
                    sx={{
                      p: 10,
                      "&.MuiTableCell-root": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {pagination && (
        <Grid container spacing={2} px={4} py={2}>
          <Box
            sx={{
              mt: 5,
              mx: "auto",
              mr: "0px",
            }}
          >
            {capitalizedData.length / rows >= 1 && (
              <Pagination
                onChange={handlePageChange}
                page={page}
                count={Math.ceil(capitalizedData.length / rows)}
                size="small"
                sx={(theme) => ({
                  ...theme.palette.pagination,
                })}
              />
            )}
          </Box>
        </Grid>
      )}
    </Box>
  );
}
