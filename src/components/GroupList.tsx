import React from "react";

const groups = [
  {
    name: "Group A",
    count: 25,
    countChange: 8,
    emotion: 0.6,
    emotionChange: 0.1,
  },
  {
    name: "Group B",
    count: 20,
    countChange: -3,
    emotion: -0.2,
    emotionChange: -0.1,
  },
  {
    name: "Group C",
    count: 18,
    countChange: -6,
    emotion: -0.5,
    emotionChange: -0.2,
  },
  {
    name: "Group D",
    count: 28,
    countChange: 10,
    emotion: 0.8,
    emotionChange: 0.2,
  },
  {
    name: "Group E",
    count: 12,
    countChange: -2,
    emotion: -0.1,
    emotionChange: -0.05,
  },
  {
    name: "Group F",
    count: 19,
    countChange: 3,
    emotion: 0.3,
    emotionChange: 0.1,
  },
];

interface GroupListProps {
  onGroupClick: (group: string) => void;
  displayMode: string;
}

const GroupList: React.FC<GroupListProps> = ({ onGroupClick, displayMode }) => {
  return (
    <ul>
      {groups.map((group, index) => (
        <li
          key={index}
          className="flex items-center justify-between py-2 px-4 border-2 border-gray-50 bg-white cursor-pointer hover:bg-gray-100"
          style={{ minHeight: "60px" }}
          onClick={() => onGroupClick(group.name)}
        >
          <span>{group.name}</span>
          {displayMode === "発話回数" ? (
            <>
              <span>{group.count}回</span>
              <span
                className={`ml-2 ${
                  group.countChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {group.countChange >= 0
                  ? `+${group.countChange}`
                  : group.countChange}
              </span>
            </>
          ) : (
            <>
              <span>{group.emotion.toFixed(1)}</span>
              <span
                className={`ml-2 ${
                  group.emotionChange >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {group.emotionChange >= 0
                  ? `+${group.emotionChange}`
                  : group.emotionChange}
              </span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
