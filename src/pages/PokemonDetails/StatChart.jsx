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
              "rgba(63, 81, 181, 0.5)",
              "rgba(77, 182, 172, 0.5)",
              "rgba(66, 133, 244, 0.5)",
              "rgba(156, 39, 176, 0.5)",
              "rgba(233, 30, 99, 0.5)",
              "rgba(66, 73, 244, 0.4)",
              "rgba(66, 133, 244, 0.2)",
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