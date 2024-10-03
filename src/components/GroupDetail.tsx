import React, { useState, useEffect } from "react";
import { GroupDetailProps } from "../types";
import TimeTransitionGraph from "./TimeTransitionGraph";
import { groupIdToNameMap } from "../utils/groupMappings";

const GroupDetail: React.FC<GroupDetailProps> = ({
  groupName,
  groupData,
  previousGroupData,
  timeLabels,
}) => {
  const [graphMode, setGraphMode] = useState<string>("発話回数");
  const [dataValues, setDataValues] = useState<{ [key: string]: number[] }>({});
  const [selectedGroups, setSelectedGroups] = useState<string[]>([groupName]);

  useEffect(() => {
    const allGroupData = previousGroupData
      ? [...previousGroupData.slice().reverse(), groupData]
      : [groupData];

    const newDataValues: { [key: string]: number[] } = {};

    for (const group in groupIdToNameMap) {
      const values: number[] = [];

      for (const groupDataAtTime of allGroupData) {
        const groupEntry = groupDataAtTime.find((g) => g.group_id === group);

        let value = 0;

        if (groupEntry) {
          value =
            graphMode === "発話回数"
              ? groupEntry.utterance_count
              : groupEntry.sentiment_value;
        }

        values.push(value);
      }

      newDataValues[group] = values;
    }

    setDataValues(newDataValues);
  }, [graphMode, groupData, previousGroupData]);

  useEffect(() => {
    setSelectedGroups([groupName]);
  }, [groupName]);

  const getGroupColor = (name: string) => {
    const colors = [
      "#845ec2",
      "#ff6f91",
      "#ffc75f",
      "#f9f871",
      "#008f7a",
      "#2c73d2",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 underline text-[rgba(36,141,116,1)]">
        {groupIdToNameMap[groupName]}
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
          <TimeTransitionGraph
            graphMode={graphMode}
            dataValues={dataValues}
            timeLabels={timeLabels}
            selectedGroups={selectedGroups}
            getGroupColor={getGroupColor}
          />
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
          {previousGroupData &&
            previousGroupData.map((data, index) => (
              <div key={index}>
                <h4>時間: {index + 1}個前</h4>
                {data.map((entry, i) => (
                  <p key={i}>
                    {entry.group_id}: {entry.utterance_count}回,{" "}
                    {entry.sentiment_value}
                  </p>
                ))}
              </div>
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
          <p>仮のシナリオテキスト</p>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
