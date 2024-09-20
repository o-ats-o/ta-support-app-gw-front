import React from "react";
import { GroupListProps } from "../types";

const GroupList: React.FC<GroupListProps> = ({
  onGroupClick,
  displayMode,
  selectedTime,
  groupData, // 新たに追加したプロパティ
}) => {
  return (
    <div>
      <ul>
        <li className="flex items-center justify-between py-2 px-4 bg-white font-bold text-md">
          <span>グループ名</span>
          <span>{displayMode === "発話回数" ? "発話回数" : "感情スコア"}</span>
          <span>変化量</span>
        </li>
        {/* APIから取得したグループデータのリスト */}
        {groupData.map((group, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 px-4 -mx-4 border-2 border-gray-50 bg-white cursor-pointer hover:bg-gray-100 font-bold"
            style={{ minHeight: "60px" }}
            onClick={() => onGroupClick(group.group_id)}
          >
            <span className="text-lg ml-4">
              Group {group.group_id.toUpperCase()}
            </span>
            {displayMode === "発話回数" ? (
              <>
                <span>{group.utterance_count}回</span>
                <span
                  className={`ml-2 ${
                    group.utterance_count >= 0
                      ? "text-green-500 mr-6"
                      : "text-red-500 mr-6"
                  }`}
                >
                  {/* 仮の変化量を表示 */}
                  +0 {/* 必要に応じて実際の変化量のデータを追加 */}
                </span>
              </>
            ) : (
              <>
                <span>{group.sentiment_value.toFixed(1)}</span>
                <span
                  className={`ml-2 ${
                    group.sentiment_value >= 0
                      ? "text-green-500 mr-6"
                      : "text-red-500 mr-6"
                  }`}
                >
                  {/* 仮の感情スコアの変化量を表示 */}
                  +0 {/* 必要に応じて実際の変化量のデータを追加 */}
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
