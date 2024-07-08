export interface GroupData {
  count: number;
  countChange: number;
  emotion: number;
  emotionChange: number;
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
}

export interface GroupDetailProps {
  groupName: string;
  displayMode: string;
}

  export const groups: Group[] = [
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
      data: [20, 30, 25, 15, 20],
      emotion: [0.4, 0.5, 0.3, 0.2, 0.3],
      history: [
        "Speaker 0: ...",
        "Speaker 2: ...",
        "Speaker 1: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
        "Speaker 0: ...",
      ],
      scenario: "Generated scenario text for Group A.",
    },
    "Group B": {
      data: [15, 25, 20, 10, 15],
      emotion: [0.1, 0.0, -0.1, -0.2, -0.1],
      history: [
        "Speaker 1: ...",
        "Speaker 0: ...",
        "Speaker 2: ...",
        "Speaker 1: ...",
      ],
      scenario: "Generated scenario text for Group B.",
    },
    "Group C": {
      data: [10, 20, 15, 5, 10],
      emotion: [-0.2, -0.3, -0.4, -0.5, -0.4],
      history: [
        "Speaker 2: ...",
        "Speaker 1: ...",
        "Speaker 0: ...",
        "Speaker 2: ...",
      ],
      scenario: "Generated scenario text for Group C.",
    },
    "Group D": {
      data: [25, 35, 30, 20, 25],
      emotion: [0.5, 0.6, 0.7, 0.8, 0.7],
      history: [
        "Speaker 0: ...",
        "Speaker 1: ...",
        "Speaker 2: ...",
        "Speaker 0: ...",
      ],
      scenario: "Generated scenario text for Group D.",
    },
    "Group E": {
      data: [5, 15, 10, 0, 5],
      emotion: [-0.1, -0.2, -0.1, -0.1, -0.1],
      history: [
        "Speaker 1: ...",
        "Speaker 2: ...",
        "Speaker 0: ...",
        "Speaker 1: ...",
      ],
      scenario: "Generated scenario text for Group E.",
    },
    "Group F": {
      data: [18, 23, 20, 13, 18],
      emotion: [0.2, 0.3, 0.1, 0.1, 0.2],
      history: [
        "Speaker 0: ...",
        "Speaker 2: ...",
        "Speaker 1: ...",
        "Speaker 0: ...",
      ],
      scenario: "Generated scenario text for Group F.",
    },
  };
  