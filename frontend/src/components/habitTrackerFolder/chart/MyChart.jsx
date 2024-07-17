import { LineChart, axisClasses } from "@mui/x-charts";

export default function MyChart() {
  return (
    <LineChart
      sx={() => ({
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "#cbcbcb",
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "#cbcbcb",
          },
        },
      })}
      colors={["#cbcbcb"]}
      xAxis={[
        {
          id: "barCategories",
          data: ["06.19", "0.20", "0.21", "0.22", "0.23", "0.24", "0.25"],
          scaleType: "point",
        },
      ]}
      series={[
        {
          data: [33, 90, 10, null, 75, 25, 99],
        },
      ]}
      height={300}
      grid={{ vertical: true, horizontal: true }}
      bottomAxis={{
        disableTicks: true,
      }}
      leftAxis={{
        disableTicks: true,
      }}
    />
  );
}

