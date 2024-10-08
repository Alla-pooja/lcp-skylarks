import { Pagination, PaginationProps } from "@mui/material";

export default function CustomPagination({ ...rest }: PaginationProps) {
  return (
    <Pagination
      sx={(theme) => ({
        ...theme.palette.pagination,
      })}
      {...rest}
    />
  );
}
