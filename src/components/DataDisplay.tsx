import React, { useEffect, useState } from "react";
import { groups, GroupDetailData } from "../types";

interface ApiData {
  id: number;
  group_id: string;
  transcript: string;
  transcript_diarize: string;
  utterance_count: number;
  sentiment_value: number;
  datetime: string;
}

const DataDisplay: React.FC = () => {
  const [data, setData] = useState<GroupDetailData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const transformData = (apiData: ApiData[]): GroupDetailData => {
    const transformedData: GroupDetailData = {};
    apiData.forEach((item) => {
      const time = item.datetime.split("T")[1].split("+")[0].substring(0, 5);
      if (!transformedData[item.group_id]) {
        transformedData[item.group_id] = {
          data: [],
          emotion: [],
          history: [],
          scenario: "",
        };
      }
      transformedData[item.group_id].data.push(item.utterance_count);
      transformedData[item.group_id].emotion.push(item.sentiment_value);
      transformedData[item.group_id].history.push(item.transcript);
      transformedData[item.group_id].scenario = item.transcript_diarize;
    });
    return transformedData;
  };

  useEffect(() => {
    fetch("http://192.168.0.105:8000/api/data/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((apiData: ApiData[]) => {
        const transformedData = transformData(apiData);
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {Object.keys(data).map((groupId) => (
        <div key={groupId}>
          <h3>Group ID: {groupId}</h3>
          <p>Data: {data[groupId].data.join(", ")}</p>
          <p>Emotion: {data[groupId].emotion.join(", ")}</p>
          <p>History: {data[groupId].history.join(", ")}</p>
          <p>Scenario: {data[groupId].scenario}</p>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
