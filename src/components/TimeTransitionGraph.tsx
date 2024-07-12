import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartEvent, LegendItem } from "chart.js";
import { groupDetailData, TimeTransitionGraphProps } from "../types";

const TimeTransitionGraph: React.FC<TimeTransitionGraphProps> = ({
  graphMode,
  getGroupColor,
  visibleGroups: initialVisibleGroups,
}) => {
  const [visibleGroups, setVisibleGroups] =
    useState<string[]>(initialVisibleGroups);

  useEffect(() => {
    setVisibleGroups(initialVisibleGroups);
  }, [initialVisibleGroups]);

  const toggleGroupVisibility = (groupName: string) => {
    setVisibleGroups((currentVisibleGroups) =>
      currentVisibleGroups.includes(groupName)
        ? currentVisibleGroups.filter((name) => name !== groupName)
        : [...currentVisibleGroups, groupName]
    );
  };

  const labels = ["13:20", "13:25", "13:30", "13:35", "13:40"];

  const data = {
    labels,
    datasets: Object.keys(groupDetailData)
      .map((name) => {
        const group = groupDetailData[name];
        if (!group) return null;
        return {
          label: name,
          data: graphMode === "発話回数" ? group.data : group.emotion,
          borderColor: getGroupColor(name),
          borderWidth: 2,
          fill: false,
          hidden: !visibleGroups.includes(name),
        };
      })
      .filter(
        (dataset): dataset is NonNullable<typeof dataset> => dataset !== null
      ),
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        onClick: (e: ChartEvent, legendItem: LegendItem, legend: any) => {
          toggleGroupVisibility(legendItem.text);
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TimeTransitionGraph;
