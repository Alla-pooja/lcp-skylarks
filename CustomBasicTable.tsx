import { Box, Grid, Pagination, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomCheckbox from "./CustomCheckbox";

export interface CustomBasicTableProps {
  showPagination?: boolean;
  showCheckboxSelector?: boolean;
  maxRowCount?: number;
  data: {
    [x: string]: string | number | React.ReactNode;
  }[];
}

export default function CustomBasicTable({ data, showCheckboxSelector = true, showPagination = false, maxRowCount = 10 }: CustomBasicTableProps) {
  const theme = useTheme();
  const columnNames: string[] = Object.keys(data[0]);
  const rows = data;

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          p: 2,
          borderRadius: 1,
          border: `1px solid ${theme.palette.additionalColors.border}`,
          background: theme.palette.background.paper,
          backgroundImage: "none",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {showCheckboxSelector && (
                <TableCell sx={{ "&.MuiTableCell-root": { borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}` } }}>
                  <CustomCheckbox />
                </TableCell>
              )}
              {columnNames.map((col, index) => {
                return (
                  <TableCell key={index} sx={{ "&.MuiTableCell-root": { borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}` } }}>
                    {col}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell
                    sx={{ "&.MuiTableCell-root": { borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}` } }}
                    component="th"
                    scope="row"
                  >
                    <CustomCheckbox />
                  </TableCell>
                  {columnNames.map((col) => {
                    return (
                      <TableCell
                        sx={{ "&.MuiTableCell-root": { borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}` } }}
                        component="th"
                        scope="row"
                      >
                        {row[col]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <Grid container spacing={2} px={4} py={2}>
          <Box
            sx={{
              mt: 5,
              mx: "auto",
              mr: "0px",
            }}
          >
            {rows.length / maxRowCount >= 1 && (
              <Pagination
                onChange={() => {}}
                page={1}
                count={Math.ceil(rows.length / maxRowCount)}
                size="small"
                sx={(theme) => ({
                  ...theme.palette.pagination,
                })}
              />
            )}
          </Box>
        </Grid>
      )}
    </>
  );
}
