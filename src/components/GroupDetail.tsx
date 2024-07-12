import React, { useState, useEffect } from "react";
import { GroupDetailProps, groupDetailData } from "../types";
import TimeTransitionGraph from "./TimeTransitionGraph";

const GroupDetail: React.FC<GroupDetailProps> = ({
  groupName,
  displayMode,
}) => {
  const [graphMode, setGraphMode] = useState(displayMode);
  const [visibleGroups, setVisibleGroups] = useState([groupName]);
  const [selectedGroup, setSelectedGroup] = useState<string>(groupName);

  useEffect(() => {
    if (groupName) {
      setVisibleGroups([groupName]);
      setSelectedGroup(groupName);
    }
  }, [groupName]);

  // グループ名に基づいて色を返す関数
  const getGroupColor = (name: string) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#cc65fe",
      "#248D74",
      "#ffcd56",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // 「all」ボタンのイベントハンドラー
  const showAllGroups = () => {
    setVisibleGroups(Object.keys(groupDetailData));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 underline text-[rgba(36,141,116,1)]">
        {selectedGroup}
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
          <div className="flex justify-end mb-4">
            <button
              onClick={showAllGroups}
              className="px-5 py-1 bg-[rgba(36,141,116,1)] text-white rounded hover:bg-[rgba(36,141,116,0.8)]"
            >
              all
            </button>
          </div>
          <TimeTransitionGraph
            graphMode={graphMode}
            visibleGroups={visibleGroups}
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
          {groupDetailData[selectedGroup]?.history.map((entry, index) => (
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
          <p>{groupDetailData[selectedGroup]?.scenario}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
