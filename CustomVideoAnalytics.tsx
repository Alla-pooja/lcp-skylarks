import React, { FC } from "react";
import Chart from "react-apexcharts";

interface VideoAnalyticsProps {
  data: number[];
}

const VideoAnalytics: FC<VideoAnalyticsProps> = ({ data }) => {
  const [graphData, setGraphData] = React.useState<{ name: string; data: number[] }[]>([
    {
      name: "Inflation",
      data,
    },
  ]);
  const [graphOptions, setGraphOptions] = React.useState<any>({
    fill: {
      type: "gradient",
    },
    chart: {
      type: "bar",
      height: 30,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      curve: "smooth",
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    tooltip: {
      followCursor: true,
      theme: "dark",
      marker: {
        show: false,
      },
      x: {
        show: false,
      },
    },
  });

  return (
    <>
      <Chart options={graphOptions} series={graphData} type="bar" height={30} />
    </>
  );
};

export default VideoAnalytics;
