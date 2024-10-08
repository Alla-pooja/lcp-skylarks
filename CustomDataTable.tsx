import { Pagination, useTheme } from "@mui/material";
import { DataGrid, DataGridProps, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from "@mui/x-data-grid";
import CustomCheckbox from "./CustomCheckbox";

export const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      sx={(theme) => ({
        ...theme.palette.pagination,
      })}
    />
  );
};

export default function CustomDataTable({ ...rest }: DataGridProps) {
  const theme = useTheme();

  return (
    <>
      <DataGrid
        autoHeight
        showCellVerticalBorder={false}
        showColumnVerticalBorder={false}
        {...rest}
        slots={{
          baseCheckbox: CustomCheckbox,
          pagination: CustomPagination,
          ...rest.slots,
        }}
        sx={{
          border: "none",
          "& .MuiDataGrid-main": {
            p: 2,
            mb: 2,
            borderRadius: 1,
            border: `1px solid ${theme.palette.additionalColors.border}`,
            background: theme.palette.background.paper,
            backgroundImage: "none",
          },
          "& .MuiDataGrid-root": {
            borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}`,
          },
          "& .MuiDataGrid-cell": {
            outline: "none",
            borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}`,
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            outline: "none",
            borderBottom: `1px solid ${theme.palette.additionalColors.border1Light}`,
          },
          "& .MuiDataGrid-columnHeader": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            border: "none",
            // borderTop: `1px solid ${theme.palette.additionalColors.border1Light}`,
          },
          "& .MuiDataGrid-columnSeparator": {
            visibility: "hidden",
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            ...theme.typography.caption,
            color: theme.palette.text.tableHeader,
          },
          "& .MuiDataGrid-cellContent": {
            ...theme.typography.body3,
            color: theme.palette.text.main,
          },
          "& .MuiFormControlLabel-root": {
            m: "auto",
          },
          "& .MuiDataGrid-row": {
            transition: "background 0.3s", // Add a transition for a smoother effect
            "&:hover": {
              background: "none", // Remove the hover effect
            },
          },
          ...rest.sx,
        }}
      />
    </>
  );
}
