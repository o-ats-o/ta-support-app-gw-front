import React, { useState, useEffect, useCallback } from "react";
import { GroupDetailProps } from "../types";
import TimeTransitionGraph from "./TimeTransitionGraph";
import { groupIdToNameMap } from "../utils/groupMappings";
import { API_BASE_URL } from "../config";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const GroupDetail: React.FC<GroupDetailProps> = ({
  groupName,
  groupData,
  previousGroupData,
  timeLabels,
  errorMessage,
  scenario,
  updateScenario,
}) => {
  // グラフ関連の状態
  const [graphMode, setGraphMode] = useState<string>("発話回数");
  const [dataValues, setDataValues] = useState<{ [key: string]: number[] }>({});

  useEffect(() => {
    const allGroupData = previousGroupData
      ? [...previousGroupData.slice().reverse(), groupData]
      : [groupData];

    const newDataValues: { [key: string]: number[] } = {};

    for (const group in groupIdToNameMap) {
      const values: number[] = [];
      for (const groupDataAtTime of allGroupData) {
        const groupEntry = groupDataAtTime.find((g) => g.group_id === group);
        let value = 0;
        if (groupEntry) {
          value =
            graphMode === "発話回数"
              ? groupEntry.utterance_count
              : groupEntry.sentiment_value;
        }
        values.push(value);
      }
      newDataValues[group] = values;
    }

    setDataValues(newDataValues);
  }, [graphMode, groupData, previousGroupData]);

  const [selectedGroups, setSelectedGroups] = useState<string[]>([groupName]);
  const [showAllGroups, setShowAllGroups] = useState<boolean>(false);

  useEffect(() => {
    if (showAllGroups) {
      // 全グループを選択
      setSelectedGroups(Object.keys(groupIdToNameMap));
    } else {
      // 選択されたグループのみを表示
      setSelectedGroups([groupName]);
    }
  }, [groupName, showAllGroups]);

  // 選択されたグループの会話履歴を取得
  const groupEntry = groupData.find((entry) => entry.group_id === groupName);
  const transcript = groupEntry ? groupEntry.transcript_diarize : "";

  // ローディングとエラーの状態をローカルで管理
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScenario = useCallback(async () => {
    if (!transcript) {
      updateScenario(groupName, "会話履歴がありません");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_BASE_URL}/api/data/generate_scenario/`,
        { transcript },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      updateScenario(groupName, response.data.scenario);
    } catch (error: any) {
      console.error("シナリオ取得中にエラーが発生しました:", error);
      setError("シナリオの生成に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [transcript, groupName, updateScenario]);

  useEffect(() => {
    if (!scenario) {
      fetchScenario();
    }
  }, [scenario, fetchScenario]);

  // 「シナリオを再生成する」ボタンのクリックハンドラ
  const handleRegenerateScenario = () => {
    fetchScenario();
  };

  const getGroupColor = (name: string) => {
    const colors = [
      "#845ec2",
      "#ff6f91",
      "#ffc75f",
      "#f9f871",
      "#008f7a",
      "#2c73d2",
      "#cf5a32",
      "#2effdc",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const allGroupData = previousGroupData
    ? [...previousGroupData.slice().reverse(), groupData]
    : [groupData];

  if (errorMessage) {
    return (
      <div className="flex justify-center items-center h-full p-32">
        <img
          src="./errorImage.png"
          alt="Error"
          style={{ width: "120px", height: "120px" }}
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 underline text-[rgba(36,141,116,1)]">
        {groupIdToNameMap[groupName]}
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
          <div className="flex justify-end mr-4">
            <button
              onClick={() => setShowAllGroups(!showAllGroups)}
              className="mb-4 px-2 py-1.5 bg-[rgba(36,141,116,1)] text-white rounded"
            >
              {showAllGroups ? "選択グループを表示" : "全グループを表示"}
            </button>
          </div>
          <TimeTransitionGraph
            graphMode={graphMode}
            dataValues={dataValues}
            timeLabels={timeLabels}
            selectedGroups={selectedGroups}
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
          {allGroupData.map((data, index) => {
            const timeLabel = timeLabels[index];
            const groupEntry = data.find(
              (entry) => entry.group_id === groupName
            );

            return (
              <div key={index} className="mb-4">
                <h4 className="font-bold">{timeLabel}</h4>
                {groupEntry && groupEntry.transcript_diarize ? (
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {groupEntry.transcript_diarize}
                  </div>
                ) : (
                  <p>会話がありません</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg mb-1 font-bold text-[rgba(36,141,116,1)]">
          声かけシナリオ
        </h3>
        <div className="flex justify-end mb-2">
          <button
            onClick={handleRegenerateScenario}
            className="px-2 py-1.5 bg-[rgba(36,141,116,1)] text-white rounded"
          >
            再生成
          </button>
        </div>
        <div className="border p-2 overflow-y-auto min-h-[15em] max-h-[15em]">
          {loading ? (
            <p>シナリオを生成しています...</p>
          ) : error ? (
            <p>{error}</p>
          ) : scenario ? (
            <article className="prose prose-neutral">
              <ReactMarkdown>{scenario}</ReactMarkdown>
            </article>
          ) : (
            <p>シナリオがありません</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
