import React from "react";
import { groups, GroupListProps } from "../types";

const GroupList: React.FC<GroupListProps> = ({
  onGroupClick,
  displayMode,
  selectedTime,
}) => {
  return (
    <div>
      <ul>
        <li className="flex items-center justify-between py-2 px-4 bg-white font-bold text-md">
          <span>グループ名</span>
          <span>{displayMode === "発話回数" ? "発話回数" : "感情スコア"}</span>
          <span>変化量</span>
        </li>
        {/* グループデータのリスト */}
        {groups.map((group, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 px-4 -mx-4 border-2 border-gray-50 bg-white cursor-pointer hover:bg-gray-100 font-bold"
            style={{ minHeight: "60px" }}
            onClick={() => onGroupClick(group.name)}
          >
            <span className="text-lg ml-4">{group.name}</span>
            {displayMode === "発話回数" ? (
              <>
                <span>{group.data[selectedTime].count}回</span>
                <span
                  className={`ml-2 ${
                    group.data[selectedTime].countChange >= 0
                      ? "text-green-500 mr-6"
                      : "text-red-500 mr-6"
                  }`}
                >
                  {group.data[selectedTime].countChange >= 0
                    ? `+${group.data[selectedTime].countChange}`
                    : group.data[selectedTime].countChange}
                </span>
              </>
            ) : (
              <>
                <span>{group.data[selectedTime].emotion.toFixed(1)}</span>
                <span
                  className={`ml-2 ${
                    group.data[selectedTime].emotionChange >= 0
                      ? "text-green-500 mr-6"
                      : "text-red-500 mr-6"
                  }`}
                >
                  {group.data[selectedTime].emotionChange >= 0
                    ? `+${group.data[selectedTime].emotionChange}`
                    : group.data[selectedTime].emotionChange}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
