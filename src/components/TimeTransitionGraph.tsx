import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { TimeTransitionGraphProps } from "../types";
import { groupIdToNameMap } from "../utils/groupMappings";

const TimeTransitionGraph: React.FC<TimeTransitionGraphProps> = ({
  graphMode,
  dataValues,
  timeLabels,
  groupName,
  groupColor,
}) => {
  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: `${groupIdToNameMap[groupName]}`,
        data: dataValues,
        borderColor: groupColor,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TimeTransitionGraph;
