export interface GroupData {
  group_id: string;
  utterance_count: number;
  sentiment_value: number;
  transcript_diarize: string;
}

export interface Group {
  name: string;
  data: {
    [time: string]: GroupData;
  };
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
  groupData: GroupData[];
  previousGroupData: GroupData[][];
  timeLabels: string[];
  errorMessage?: string | null;
}

export interface TimeTransitionGraphProps {
  graphMode: string;
  dataValues: { [key: string]: number[] };
  timeLabels: string[];
  selectedGroups: string[];
  getGroupColor: (name: string) => string;
}