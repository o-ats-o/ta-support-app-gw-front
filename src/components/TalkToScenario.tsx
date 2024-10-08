// TalkToScenario.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { TalkToScenarioProps } from "../types";

const TalkToScenario: React.FC<TalkToScenarioProps> = ({ transcript }) => {
  const [scenario, setScenario] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScenario = async () => {
      if (!transcript) {
        setScenario("会話履歴がありません");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 新しいエンドポイントにリクエストを送信
        const response = await axios.post(
          `${API_BASE_URL}/api/data/generate_scenario/`,
          {
            transcript,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setScenario(response.data.scenario);
      } catch (error: any) {
        console.error("シナリオ取得中にエラーが発生しました:", error);
        setError("シナリオの生成に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchScenario();
  }, [transcript]);

  return (
    <div>
      {loading ? (
        <p>シナリオを生成しています...</p>
      ) : error ? (
        <p>{error}</p>
      ) : scenario ? (
        <div style={{ whiteSpace: "pre-wrap" }}>{scenario}</div>
      ) : (
        <p>会話履歴がありません</p>
      )}
    </div>
  );
};

export default TalkToScenario;
