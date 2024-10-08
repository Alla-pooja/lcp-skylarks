import { Box, Typography, useTheme } from "@mui/material";
import { DatePickerToolbarProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { formatDateTimeIntoDDMMMYYYY } from "../utils/helper";
import CustomButton from "./CustomButton";
import CustomPopover from "./CustomPopover";

export interface DateRangeProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface PureDateRangeProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface CustomDateRangePickerButtonProps {
  onChange: (value: PureDateRangeProps) => void;
}

export interface CustomToolbarProps extends DatePickerToolbarProps<Dayjs> {
  label?: string;
  [x: string]: any;
}

function CustomToolbar(props: CustomToolbarProps) {
  return (
    <Box
      // Pass the className to the root element to get correct layout
      className={props.className}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}
    >
      <Typography variant="h6" textAlign="center">
        {props.label || "Select Date"}
      </Typography>
    </Box>
  );
}

export default function CustomDateRangePickerButton({ onChange }: CustomDateRangePickerButtonProps) {
  const theme = useTheme();
  const [dateRange, setDateRange] = React.useState<DateRangeProps>({
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
  });
  const [dateRangePickerAnchorEl, setDateRangePickerAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenDateRangePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDateRangePickerAnchorEl(event.currentTarget);
  };

  const handleCloseDateRangePicker = () => {
    setDateRangePickerAnchorEl(null);
  };

  React.useEffect(() => {
    onChange({
      startDate: dateRange.startDate?.toDate(),
      endDate: dateRange.endDate?.toDate(),
    });
  }, [dateRange]);

  return (
    <>
      <CustomButton onClick={handleOpenDateRangePicker} sx={{ color: theme.palette.text.default }}>
        {dateRange.startDate ? formatDateTimeIntoDDMMMYYYY(dateRange.startDate.toDate()) : "Start Date"} -{" "}
        {dateRange.endDate ? formatDateTimeIntoDDMMMYYYY(dateRange.endDate.toDate()) : "End Date"}
      </CustomButton>
      <CustomPopover
        open={Boolean(dateRangePickerAnchorEl)}
        anchorEl={dateRangePickerAnchorEl}
        onClose={handleCloseDateRangePicker}
        sx={{ "& .MuiPaper-root.MuiPopover-paper": { p: 0 } }}
      >
        <Box sx={{ display: "flex", flexDirection: ["column", "row"] }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(value) => setDateRange((prev) => ({ ...prev, startDate: value }))}
              disableFuture
              value={dateRange.startDate}
              slots={{ toolbar: (props) => <CustomToolbar label="Select Start Date" {...props} /> }}
              slotProps={{ toolbar: { hidden: true }, actionBar: { actions: [] } }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              onChange={(value) => setDateRange((prev) => ({ ...prev, endDate: value }))}
              disableFuture
              value={dateRange.endDate}
              slots={{ toolbar: (props) => <CustomToolbar label="Select End Date" {...props} /> }}
              slotProps={{ toolbar: { hidden: true }, actionBar: { actions: [] } }}
            />
          </LocalizationProvider>
        </Box>
      </CustomPopover>
    </>
  );
}
