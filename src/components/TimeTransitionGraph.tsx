import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { TimeTransitionGraphProps } from "../types";
import { groupIdToNameMap } from "../utils/groupMappings";

const TimeTransitionGraph: React.FC<TimeTransitionGraphProps> = ({
  graphMode,
  dataValues,
  timeLabels,
  selectedGroups,
  getGroupColor,
}) => {
  const [hiddenGroups, setHiddenGroups] = useState<string[]>([]);

  // selectedGroupsが変更されたとき、hiddenGroupsを更新
  useEffect(() => {
    const groupsToHide = Object.keys(dataValues).filter(
      (group) => !selectedGroups.includes(group)
    );
    setHiddenGroups(groupsToHide.map((group) => groupIdToNameMap[group]));
  }, [selectedGroups, dataValues]);

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
    hidden: hiddenGroups.includes(groupIdToNameMap[group]),
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
