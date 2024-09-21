import React, { useState, useEffect } from "react";
import GroupList from "./components/GroupList";
import GroupDetail from "./components/GroupDetail";
import Header from "./components/Header";
import DataDisplay from "./components/DataDisplay";
import axios from "axios";
import { API_BASE_URL, DATE } from "./config";

// 取得する時間を変更したい時はここを変更
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 9; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      if (hour === 12 && minute > 5) break;
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}〜`;
      times.push(time);
    }
  }
  return times;
};

const App: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState("Group A");
  const [displayMode, setDisplayMode] = useState("発話回数");
  const [selectedTime, setSelectedTime] = useState("09:00〜");
  const [groupData, setGroupData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hour, minute] = selectedTime.slice(0, -1).split(":");
        const datetimeAfter = `${DATE}${hour}:${minute}:00`;

        const newMinute = parseInt(minute) + 4;
        const formattedMinute = newMinute.toString().padStart(2, "0");

        const datetimeBefore = `${DATE}${hour}:${formattedMinute}:59`;

        const response = await axios.get(
          `${API_BASE_URL}/api/data/?datetime_after=${datetimeAfter}&datetime_before=${datetimeBefore}`
        );
        setGroupData(response.data);
        setErrorMessage(null);
        console.log("API Response:", response.data);
      } catch (error) {
        if ((error as any).response && (error as any).response.status === 404) {
          setErrorMessage("一致する検索結果がありません");
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedTime]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex pt-16" style={{ minHeight: "100vh" }}>
        <div className="w-2/5 p-4 border rounded-l-md border-[rgba(36,141,116,1)] mt-4 ml-4 group-list">
          <div className="flex font-bold items-center mb-2">
            <button
              onClick={() => setDisplayMode("発話回数")}
              className={`px-4 py-2 w-full relative ${
                displayMode === "発話回数"
                  ? "text-[rgba(36,141,116,1)]"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span
                className={`block pb-1 ${
                  displayMode === "発話回数"
                    ? "border-b-2 border-[rgba(36,141,116,1)]"
                    : ""
                }`}
              >
                発話回数
              </span>
            </button>
            <button
              onClick={() => setDisplayMode("感情")}
              className={`px-4 py-2 w-full relative ${
                displayMode === "感情"
                  ? "text-[rgba(36,141,116,1)]"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span
                className={`block pb-1 ${
                  displayMode === "感情"
                    ? "border-b-2 border-[rgba(36,141,116,1)]"
                    : ""
                }`}
              >
                感情
              </span>
            </button>
            <select
              className="ml-12 mb-2 p-2 border rounded"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <GroupList
            onGroupClick={handleGroupClick}
            displayMode={displayMode}
            selectedTime={selectedTime}
            groupData={groupData}
          />
          {errorMessage && (
            <div className="text-black-500 mb-2">{errorMessage}</div>
          )}
        </div>
        <div className="flex-1 p-4 overflow-y-auto border rounded-r-md border-[rgba(36,141,116,1)] mt-4 mr-2 group-detail">
          <GroupDetail groupName={selectedGroup} displayMode={displayMode} />
        </div>
      </div>
      <div className="p-4">
        <DataDisplay />
      </div>
    </div>
  );
};

export default App;
