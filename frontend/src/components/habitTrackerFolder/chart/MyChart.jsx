import { LineChart, axisClasses } from "@mui/x-charts";

export default function MyChart({ dates }) {
  // Extract date strings and action counts from the `dates` prop
  const xAxisData = dates.map(day => day.date);
  const seriesData = dates.map(day => {
    const totalActions = day.actions.length;
    const completedActions = day.actions.filter(action => action.complete).length;
    // Avoid division by zero
    return totalActions > 0 ? (completedActions / totalActions) * 100 : 0;
  });

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
          id: "dateAxis",
          data: xAxisData, // Use the extracted date array
          scaleType: "point",
        },
      ]}
      series={[
        {
          data: seriesData, // Use the extracted series data
        },
      ]}
      height={300}
      grid={{ vertical: true, horizontal: true }}
      bottomAxis={{
        disableTicks: false, // Adjust if needed
      }}
      leftAxis={{
        disableTicks: false, // Adjust if needed
      }}
    />
  );
}
