import { TEChart } from "tw-elements-react";
import { PropTypes } from "prop-types"

export default function StatChart(props) {
  return (
    <TEChart
      type="polarArea"
      data={{
        labels: props.labels,
        datasets: [
          {
            label: "Stats",
            data: props.data,
            backgroundColor: [
              "rgba(95, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(255, 107, 0, 0.5)",
              "rgba(66, 73, 244, 0.5)",
              "rgba(66, 133, 244, 0.5)",
              "rgba(156, 39, 176, 0.5)",
            ],
          },
        ],
      }}
    />
  );
}

StatChart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array
}