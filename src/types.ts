export interface GroupData {
  group_id: string;
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
  groupData: GroupData[];
  previousGroupData: GroupData[][];
  timeLabels: string[];
}

export interface TimeTransitionGraphProps {
  graphMode: string;
  dataValues: number[];
  timeLabels: string[];
  groupName: string;
  groupColor: string;
}