import { Box, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface RadialBarProps {
  subTitle: string;
  count: string;
  value: number;
}

interface BarOption {
  chart: {
    height: number;
    type: "radialBar";
  };
  plotOptions: {
    radialBar: {
      hollow: {
        margin: number;
        size: string;
        background: string;
      };
      track: {
        background: string;
        startAngle: number;
        endAngle: number;
      };
      dataLabels: {
        name: {
          show: boolean;
        };
        value: {
          formatter: (val: number) => string;
          color: string;
          fontSize: string;
          show: boolean;
        };
      };
    };
  };
  fill: {
    type: string;
    gradient: {
      shade: string;
      type: string;
      gradientToColors: string[];
      stops: number[];
    };
  };
  stroke: {
    lineCap: "butt";
  };
}

const CustomRadialBar: FC<RadialBarProps> = ({ subTitle, count, value }) => {
  const theme = useTheme();
  const [barData, setBarData] = useState<BarOption>({
    chart: {
      height: 125,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "30%",
          background: "transparent",
        },
        track: {
          background: "#181d28",
          startAngle: 0,
          endAngle: 360,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            formatter: function (val: number) {
              return String(val);
            },
            color: "transparent",
            fontSize: "12px",
            show: false,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#2EA3FF", "#1C5D91"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
  });

  return (
    <Box>
      <Box id="card" sx={{ height: "84px", marginTop: "-8px", mb: 0.5 }}>
        <Box id="chart">
          <ReactApexChart options={barData} series={[value]} type="radialBar" height={125} />
        </Box>
      </Box>
      <Typography
        variant="subtitle2"
        color={theme.palette.text.titleLabel}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "-42px",
          marginBottom: "23px",
          fontSize: "15px",
        }}
      >
        {count}%
      </Typography>
      <Typography
        variant="subtitle3"
        color={theme.palette.text.titleLabel}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", textTransform: "capitalize", mt: 1 }}
      >
        {subTitle}
      </Typography>
    </Box>
  );
};

export default CustomRadialBar;
