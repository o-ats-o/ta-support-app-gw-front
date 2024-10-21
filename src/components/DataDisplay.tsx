import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [data, setData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://192.168.231.171:8000/api/data/?search=g")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.Error || error.message;
        setError(errorMessage);
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
      {data.map((item) => (
        <div key={item.id}>
          <h3>Group ID: {item.group_id}</h3>
          <p>Transcript: {item.transcript}</p>
          <p>Transcript Diarize: {item.transcript_diarize}</p>
          <p>Utterance Count: {item.utterance_count}</p>
          <p>Sentiment Value: {item.sentiment_value}</p>
          <p>Datetime: {item.datetime}</p>
        </div>
      ))}
    </div>
  );
};

export default DataDisplay;
