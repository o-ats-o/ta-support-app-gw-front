import React, { useState, useEffect } from "react";
import GroupList from "./components/GroupList";
import GroupDetail from "./components/GroupDetail";
import Header from "./components/Header";
import axios from "axios";
import { API_BASE_URL, DATE } from "./config";

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
  const [selectedGroup, setSelectedGroup] = useState("a");
  const [displayMode, setDisplayMode] = useState("発話回数");
  const [selectedTime, setSelectedTime] = useState(
    localStorage.getItem("selectedTime") || "09:00〜"
  );
  const [groupData, setGroupData] = useState<any[]>([]); // 初期値を空の配列に設定
  const [previousGroupData, setPreviousGroupData] = useState<any[][]>([]); // 初期値を空の配列に設定
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const times: string[] = [];
        const [hour, minute] = selectedTime.slice(0, -1).split(":");
        const datetimeAfter = `${DATE}${hour}:${minute}:00`;

        const newMinute = parseInt(minute) + 4;
        const formattedMinute = newMinute.toString().padStart(2, "0");

        const datetimeBefore = `${DATE}${hour}:${formattedMinute}:59`;

        // 現在の時間ラベルを追加
        times.push(`${hour}:${minute}`);

        const response = await axios.get(
          `${API_BASE_URL}/api/data/?datetime_after=${datetimeAfter}&datetime_before=${datetimeBefore}`
        );
        setGroupData(response.data);
        setErrorMessage(null);
        console.log("API Response:", response.data);

        // 4個前の時間のデータを取得
        const previousDataPromises = [];
        for (let i = 1; i <= 4; i++) {
          let previousMinute = parseInt(minute) - 5 * i;
          let previousHour = parseInt(hour);

          if (previousMinute < 0) {
            previousMinute += 60;
            previousHour -= 1;
          }

          if (previousHour < 0) {
            times.push("無効な時間");
            previousDataPromises.push(Promise.resolve([]));
            continue;
          }

          const formattedPreviousMinute = previousMinute
            .toString()
            .padStart(2, "0");
          const formattedPreviousHour = previousHour
            .toString()
            .padStart(2, "0");
          const previousDatetimeAfter = `${DATE}${formattedPreviousHour}:${formattedPreviousMinute}:00`;
          const previousDatetimeBefore = `${DATE}${formattedPreviousHour}:${(
            previousMinute + 4
          )
            .toString()
            .padStart(2, "0")}:59`;

          // 時間ラベルを追加
          times.push(`${formattedPreviousHour}:${formattedPreviousMinute}`);

          previousDataPromises.push(
            axios
              .get(
                `${API_BASE_URL}/api/data/?datetime_after=${previousDatetimeAfter}&datetime_before=${previousDatetimeBefore}`
              )
              .then((res) => res.data)
              .catch((error) => {
                console.error(
                  "過去のデータ取得中にエラーが発生しました:",
                  error
                );
                return [];
              })
          );
        }

        const previousDataResults = await Promise.all(previousDataPromises);
        setPreviousGroupData(previousDataResults);

        // 時間ラベルを古い順に並べ替え
        setTimeLabels(times.reverse());

        console.log("Previous API Responses:", previousDataResults);
      } catch (error) {
        if ((error as any).response && (error as any).response.status === 404) {
          setErrorMessage("一致する検索結果がありません");
        } else {
          console.error("データ取得中にエラーが発生しました:", error);
        }
      }
    };

    fetchData();
  }, [selectedTime]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value;
    setSelectedTime(newTime);
    localStorage.setItem("selectedTime", newTime);
  };

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
              onChange={handleTimeChange}
            >
              {generateTimeOptions().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          {errorMessage ? (
            <div className="text-black-500 mb-2">{errorMessage}</div>
          ) : (
            <GroupList
              onGroupClick={handleGroupClick}
              displayMode={displayMode}
              selectedTime={selectedTime}
              groupData={groupData}
              previousGroupData={previousGroupData[0]} // 最新の前のデータを渡す
            />
          )}
        </div>
        <div className="flex-1 p-4 overflow-y-auto border rounded-r-md border-[rgba(36,141,116,1)] mt-4 mr-2 group-detail">
          <GroupDetail
            groupName={selectedGroup}
            groupData={groupData}
            previousGroupData={previousGroupData}
            timeLabels={timeLabels}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
