import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { TimeTransitionGraphProps } from "../types";
import { groupIdToNameMap } from "../utils/groupMappings";

const TimeTransitionGraph: React.FC<TimeTransitionGraphProps> = ({
  graphMode,
  dataValues,
  timeLabels,
  selectedGroup,
  getGroupColor,
}) => {
  const [hiddenGroups, setHiddenGroups] = useState<string[]>([]);

  const handleLegendClick = (e: any, legendItem: any) => {
    const group = legendItem.text;
    setHiddenGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const datasets = Object.keys(dataValues).map((group) => ({
    label: `${groupIdToNameMap[group]}`,
    data: dataValues[group],
    borderColor: getGroupColor(group),
    borderWidth: 2,
    fill: false,
    hidden:
      group !== selectedGroup &&
      !hiddenGroups.includes(groupIdToNameMap[group]),
  }));

  const data = {
    labels: timeLabels,
    datasets: datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        onClick: handleLegendClick,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TimeTransitionGraph;
