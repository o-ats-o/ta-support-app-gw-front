export interface GroupData {
  group_id: string; // group_id プロパティを追加
  utterance_count: number;
  sentiment_value: number;
}

export interface Group {
  name: string;
  data: {
    [time: string]: GroupData;
  };
}

export interface GroupDetails {
  data: number[];
  emotion: number[];
  history: string[];
  scenario: string;
}

export interface GroupListProps {
  onGroupClick: (group: string) => void;
  displayMode: string;
  selectedTime: string;
  groupData: GroupData[]; // APIレスポンスの型
  previousGroupData: GroupData[]; // 前の時間のデータの型
}

export interface GroupDetailProps {
  groupName: string;
  displayMode: string;
  previousGroupData: GroupData[][]; // 4個前までのデータの型
}

export interface TimeTransitionGraphProps {
  graphMode: string;
  visibleGroups: string[];
  getGroupColor: (name: string) => string;
}

export type GroupDetailData = {
  [key: string]: {
    data: number[];
    emotion: number[];
    history: string[];
    scenario: string;
  };
};

export const groupDetailData: GroupDetailData = {
  "Group A": {
    data: [20, 10, 25, 15, 20],
    emotion: [0.4, 0.5, 0.3, 0.2, 0.3],
    history: Array.from(
      { length: Math.floor(Math.random() * 10) + 5 },
      (_, i) => `Speaker ${Math.floor(Math.random() * 3)}: ...`
    ),
    scenario: "Generated scenario text for Group A.",
  },
  "Group B": {
    data: [15, 25, 20, 10, 15],
    emotion: [0.1, 0.0, -0.1, -0.2, -0.1],
    history: Array.from(
      { length: Math.floor(Math.random() * 15) + 3 },
      (_, i) => `Speaker ${Math.floor(Math.random() * 3)}: ...`
    ),
    scenario: "Generated scenario text for Group B.",
  },
  "Group C": {
    data: [10, 20, 15, 5, 10],
    emotion: [-0.2, -0.3, -0.4, -0.5, -0.4],
    history: Array.from(
      { length: Math.floor(Math.random() * 20) + 1 },
      (_, i) => `Speaker ${Math.floor(Math.random() * 3)}: ...`
    ),
    scenario: "Generated scenario text for Group C.",
  },
  "Group D": {
    data: [25, 35, 30, 20, 25],
    emotion: [0.5, 0.6, 0.7, 0.8, 0.7],
    history: Array.from(
      { length: Math.floor(Math.random() * 8) + 8 },
      (_, i) => `Speaker ${Math.floor(Math.random() * 3)}: ...`
    ),
    scenario: "Generated scenario text for Group D.",
  },
  "Group E": {
    data: [5, 15, 10, 0, 5],
    emotion: [-0.1, -0.2, -0.1, -0.1, -0.1],
    history: Array.from(
      { length: Math.floor(Math.random() * 12) + 2 },
      (_, i) => `Speaker ${Math.floor(Math.random() * 3)}: ...`
    ),
    scenario: "Generated scenario text for Group E.",
  },
  "Group F": {
    data: [18, 10, 20, 13, 18],
    emotion: [0.2, 0.3, 0.1, 0.1, 0.2],
    history: Array.from(
      { length: Math.floor(Math.random() * 7) + 10 },
      (_, i) => `Speaker ${Math.floor(Math.random() * 3)}: ...`
    ),
    scenario: "Generated scenario text for Group F.",
  },
};