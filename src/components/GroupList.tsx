import React from "react";

interface GroupData {
  count: number;
  countChange: number;
  emotion: number;
  emotionChange: number;
}

interface Group {
  name: string;
  data: {
    [time: string]: GroupData; // インデックスシグネチャを追加
  };
}

interface GroupListProps {
  onGroupClick: (group: string) => void;
  displayMode: string;
  selectedTime: string;
}

const groups: Group[] = [
  {
    name: "Group A",
    data: {
      "13:20": { count: 20, countChange: 5, emotion: 0.5, emotionChange: 0.1 },
      "13:25": { count: 25, countChange: 8, emotion: 0.6, emotionChange: 0.1 },
      "13:30": { count: 30, countChange: 10, emotion: 0.7, emotionChange: 0.2 },
      "13:35": {
        count: 15,
        countChange: -5,
        emotion: 0.3,
        emotionChange: -0.1,
      },
      "13:40": { count: 20, countChange: 5, emotion: 0.4, emotionChange: 0.1 },
    },
  },
  {
    name: "Group B",
    data: {
      "13:20": { count: 15, countChange: 3, emotion: 0.2, emotionChange: 0.0 },
      "13:25": { count: 20, countChange: 5, emotion: 0.1, emotionChange: -0.1 },
      "13:30": {
        count: 25,
        countChange: 10,
        emotion: 0.0,
        emotionChange: -0.1,
      },
      "13:35": {
        count: 10,
        countChange: -5,
        emotion: -0.2,
        emotionChange: -0.1,
      },
      "13:40": { count: 15, countChange: 5, emotion: -0.1, emotionChange: 0.1 },
    },
  },
  {
    name: "Group C",
    data: {
      "13:20": {
        count: 10,
        countChange: -3,
        emotion: -0.2,
        emotionChange: -0.1,
      },
      "13:25": {
        count: 18,
        countChange: -6,
        emotion: -0.5,
        emotionChange: -0.2,
      },
      "13:30": {
        count: 20,
        countChange: 5,
        emotion: -0.4,
        emotionChange: -0.2,
      },
      "13:35": {
        count: 5,
        countChange: -10,
        emotion: -0.6,
        emotionChange: -0.3,
      },
      "13:40": {
        count: 10,
        countChange: 3,
        emotion: -0.4,
        emotionChange: -0.1,
      },
    },
  },
  {
    name: "Group D",
    data: {
      "13:20": { count: 25, countChange: 10, emotion: 0.6, emotionChange: 0.1 },
      "13:25": { count: 28, countChange: 10, emotion: 0.8, emotionChange: 0.2 },
      "13:30": { count: 35, countChange: 15, emotion: 0.9, emotionChange: 0.3 },
      "13:35": { count: 20, countChange: -5, emotion: 0.5, emotionChange: 0.0 },
      "13:40": { count: 25, countChange: 5, emotion: 0.7, emotionChange: 0.1 },
    },
  },
  {
    name: "Group E",
    data: {
      "13:20": {
        count: 5,
        countChange: -2,
        emotion: -0.1,
        emotionChange: -0.05,
      },
      "13:25": {
        count: 12,
        countChange: -2,
        emotion: -0.1,
        emotionChange: -0.05,
      },
      "13:30": { count: 15, countChange: 5, emotion: 0.0, emotionChange: 0.0 },
      "13:35": {
        count: 0,
        countChange: -5,
        emotion: -0.2,
        emotionChange: -0.1,
      },
      "13:40": { count: 5, countChange: 5, emotion: -0.1, emotionChange: 0.0 },
    },
  },
  {
    name: "Group F",
    data: {
      "13:20": { count: 18, countChange: 3, emotion: 0.2, emotionChange: 0.0 },
      "13:25": { count: 19, countChange: 3, emotion: 0.3, emotionChange: 0.1 },
      "13:30": { count: 23, countChange: 5, emotion: 0.4, emotionChange: 0.1 },
      "13:35": {
        count: 13,
        countChange: -5,
        emotion: 0.1,
        emotionChange: -0.1,
      },
      "13:40": { count: 18, countChange: 5, emotion: 0.3, emotionChange: 0.1 },
    },
  },
];

const GroupList: React.FC<GroupListProps> = ({
  onGroupClick,
  displayMode,
  selectedTime,
}) => {
  return (
    <ul>
      {groups.map((group, index) => (
        <li
          key={index}
          className="flex items-center justify-between py-2 px-4 border-2 border-gray-50 bg-white cursor-pointer hover:bg-gray-100 font-bold"
          style={{ minHeight: "60px" }}
          onClick={() => onGroupClick(group.name)}
        >
          <span className="text-lg">{group.name}</span>
          {displayMode === "発話回数" ? (
            <>
              <span>{group.data[selectedTime].count}回</span>
              <span
                className={`ml-2 ${
                  group.data[selectedTime].countChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
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
                    ? "text-green-500"
                    : "text-red-500"
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
  );
};

export default GroupList;
