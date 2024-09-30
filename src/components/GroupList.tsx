import React from "react";
import { GroupListProps } from "../types";
import { groupIdToNameMap } from "../utils/groupMappings";

const GroupList: React.FC<GroupListProps> = ({
  onGroupClick,
  displayMode,
  selectedTime,
  groupData,
  previousGroupData,
}) => {
  // group_idを昇順にソート
  const sortedGroupData = [...groupData].sort((a, b) =>
    a.group_id.localeCompare(b.group_id)
  );

  // 変化量を計算する関数
  const calculateChange = (currentValue: number, previousValue: number) => {
    return currentValue - previousValue;
  };

  return (
    <div>
      <ul>
        <li className="flex items-center justify-between py-2 px-4 bg-white font-bold text-md">
          <span>グループ名</span>
          <span>{displayMode === "発話回数" ? "発話回数" : "感情スコア"}</span>
          <span>変化量</span>
        </li>
        {/* ソートされたグループデータのリスト */}
        {sortedGroupData.map((group, index) => {
          const previousGroup = previousGroupData
            ? previousGroupData.find(
                (prevGroup) => prevGroup.group_id === group.group_id
              )
            : null;
          const change =
            displayMode === "発話回数"
              ? calculateChange(
                  group.utterance_count,
                  previousGroup ? previousGroup.utterance_count : 0
                )
              : calculateChange(
                  group.sentiment_value,
                  previousGroup ? previousGroup.sentiment_value : 0
                );

          return (
            <li
              key={index}
              className="flex items-center justify-between py-2 px-4 -mx-4 border-2 border-gray-50 bg-white cursor-pointer hover:bg-gray-100 font-bold"
              style={{ minHeight: "60px" }}
              onClick={() => onGroupClick(group.group_id)}
            >
              <span className="text-lg ml-4">
                {groupIdToNameMap[group.group_id]}{" "}
                {/* group_idをグループ名に変換 */}
              </span>
              {displayMode === "発話回数" ? (
                <>
                  <span>{group.utterance_count}回</span>
                  <span
                    className={`ml-2 ${
                      change > 0
                        ? "text-green-500 mr-6"
                        : change < 0
                        ? "text-red-500 mr-6"
                        : "text-gray-500 mr-6"
                    }`}
                  >
                    {change > 0 ? `+${change}` : change}
                  </span>
                </>
              ) : (
                <>
                  <span>{group.sentiment_value.toFixed(1)}</span>
                  <span
                    className={`ml-2 ${
                      change > 0
                        ? "text-green-500 mr-6"
                        : change < 0
                        ? "text-red-500 mr-6"
                        : "text-gray-500 mr-6"
                    }`}
                  >
                    {change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1)}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupList;
