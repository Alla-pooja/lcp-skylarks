import { useTheme } from "@mui/material";
import Chart from "react-apexcharts";

type CustomColor = string;

interface ChartDataProps {
  tooltip: {
    enabled: boolean;
  };
  plotOptions: {
    bar: {
      horizontal: boolean;
      dataLabels: {
        position: string;
      };
    };
  };
  dataLabels: {
    enabled: boolean;
    formatter: (val: number) => string;
    offsetX: number;
  };
  xaxis: {
    categories: string[];
    position: string;
    labels: {
      show: boolean;
      offsetY: number;
      style: {
        colors: CustomColor;
      };
    };
    axisBorder: {
      show: boolean;
    };
    axisTicks: {
      show: boolean;
    };
  };
  fill: {
    type: string;
    gradient: {
      type: string;
      shadeIntensity: number;
      opacityFrom: number;
      opacityTo: number;
      colorStops: {
        offset: number;
        color: CustomColor;
        opacity: number;
      }[];
    };
  };
  yaxis: {
    show: boolean;
  };
  chart: {
    toolbar: {
      show: boolean;
      height: number;
      type: "bar";
    };
  };
  grid: {
    show: boolean;
  };
  states: {
    hover: {
      filter: {
        type: string;
        value: number;
      };
    };
    active: {
      filter: {
        type: string;
        value: number;
      };
    };
  };
}

export interface BarChartProps {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export default function CustomBarChart({ categories, series }: BarChartProps) {
  const theme = useTheme();

  const chartData: ChartDataProps = {
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val: number) {
        return Number(val).toLocaleString();
      },
      offsetX: 30,
    },
    xaxis: {
      categories: categories,
      position: "bottom",
      labels: {
        show: true,
        offsetY: 0,
        style: {
          colors: theme.palette.text.titleLabel as CustomColor,
          ...theme.typography.caption,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "horizontal",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          {
            offset: 0,
            color: theme.palette.background.barGraphLight as CustomColor,
            opacity: 1,
          },
          {
            offset: 100,
            color: theme.palette.background.barGraphDark as CustomColor,
            opacity: 1,
          },
        ],
      },
    },
    yaxis: {
      show: false, // Set to false to disable the Y-axis
    },
    chart: {
      toolbar: {
        show: false,
        height: 300,
        type: "bar",
      },
    },
    grid: {
      show: false,
    },
    states: {
      hover: { filter: { type: "none", value: 0 } },
      active: { filter: { type: "none", value: 0 } },
    },
  };
  return <Chart options={chartData} series={series} width={"100%"} height={150} type="bar" />;
}
