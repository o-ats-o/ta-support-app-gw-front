import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

type GroupData = {
  [key: string]: {
    data: number[];
    emotion: number[];
    history: string[];
    scenario: string;
  };
};

const groupData: GroupData = {
  "Group A": {
    data: [20, 30, 25, 15, 20],
    emotion: [0.4, 0.5, 0.3, 0.2, 0.3],
    history: [
      "Speaker 0: ...",
      "Speaker 2: ...",
      "Speaker 1: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
      "Speaker 0: ...",
    ],
    scenario: "Generated scenario text for Group A.",
  },
  "Group B": {
    data: [15, 25, 20, 10, 15],
    emotion: [0.1, 0.0, -0.1, -0.2, -0.1],
    history: [
      "Speaker 1: ...",
      "Speaker 0: ...",
      "Speaker 2: ...",
      "Speaker 1: ...",
    ],
    scenario: "Generated scenario text for Group B.",
  },
  "Group C": {
    data: [10, 20, 15, 5, 10],
    emotion: [-0.2, -0.3, -0.4, -0.5, -0.4],
    history: [
      "Speaker 2: ...",
      "Speaker 1: ...",
      "Speaker 0: ...",
      "Speaker 2: ...",
    ],
    scenario: "Generated scenario text for Group C.",
  },
  "Group D": {
    data: [25, 35, 30, 20, 25],
    emotion: [0.5, 0.6, 0.7, 0.8, 0.7],
    history: [
      "Speaker 0: ...",
      "Speaker 1: ...",
      "Speaker 2: ...",
      "Speaker 0: ...",
    ],
    scenario: "Generated scenario text for Group D.",
  },
  "Group E": {
    data: [5, 15, 10, 0, 5],
    emotion: [-0.1, -0.2, -0.1, -0.1, -0.1],
    history: [
      "Speaker 1: ...",
      "Speaker 2: ...",
      "Speaker 0: ...",
      "Speaker 1: ...",
    ],
    scenario: "Generated scenario text for Group E.",
  },
  "Group F": {
    data: [18, 28, 23, 13, 18],
    emotion: [0.2, 0.3, 0.4, 0.3, 0.3],
    history: [
      "Speaker 2: ...",
      "Speaker 0: ...",
      "Speaker 1: ...",
      "Speaker 2: ...",
    ],
    scenario: "Generated scenario text for Group F.",
  },
};

interface GroupDetailProps {
  groupName: string;
  displayMode: string;
}

const GroupDetail: React.FC<GroupDetailProps> = ({
  groupName,
  displayMode,
}) => {
  const group = groupData[groupName];
  const [graphMode, setGraphMode] = useState(displayMode);

  const data = {
    labels: ["13:20", "13:25", "13:30", "13:35", "13:40"],
    datasets: [
      {
        label: graphMode,
        data: graphMode === "発話回数" ? group.data : group.emotion,
        borderColor:
          graphMode === "感情" ? "rgba(255,159,64,1)" : "rgba(75,192,192,1)",
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

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 underline text-[rgba(36,141,116,1)]">
        {groupName}
      </h2>
      <div className="mb-4">
        <h3 className="text-lg mb-1 font-bold text-[rgba(36,141,116,1)]">
          時間推移
        </h3>
        <div className="border border-gray-300 p-4">
          <div className="flex justify-center space-x-4 mb-4 mx-24 font-bold">
            <button
              onClick={() => setGraphMode("発話回数")}
              className={`px-4 py-2 w-full relative ${
                graphMode === "発話回数"
                  ? "text-[rgba(36,141,116,1)]"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span
                className={`block pb-1 ${
                  graphMode === "発話回数"
                    ? "border-b-2 border-[rgba(36,141,116,1)]"
                    : ""
                }`}
              >
                発話回数
              </span>
            </button>
            <button
              onClick={() => setGraphMode("感情")}
              className={`px-4 py-2 w-full relative ${
                graphMode === "感情"
                  ? "text-[rgba(36,141,116,1)]"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span
                className={`block pb-1 ${
                  graphMode === "感情"
                    ? "border-b-2 border-[rgba(36,141,116,1)]"
                    : ""
                }`}
              >
                感情
              </span>
            </button>
          </div>
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg mb-1 font-bold text-[rgba(36,141,116,1)]">
          会話履歴
        </h3>
        <div
          className="border p-2 overflow-y-auto"
          style={{ minHeight: "15em", maxHeight: "15em" }}
        >
          {group.history.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg mb-1 font-bold text-[rgba(36,141,116,1)]">
          声かけシナリオ
        </h3>
        <div
          className="border p-2 overflow-y-auto"
          style={{ minHeight: "15em", maxHeight: "15em" }}
        >
          <p>{group.scenario}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
