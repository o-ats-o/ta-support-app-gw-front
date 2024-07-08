import React, { useState } from "react";
import GroupList from "./components/GroupList";
import GroupDetail from "./components/GroupDetail";
import Header from "./components/Header";

const App: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState("Group A");
  const [displayMode, setDisplayMode] = useState("発話回数");
  const [selectedTime, setSelectedTime] = useState("13:40");

  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
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
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="13:20">13:20</option>
              <option value="13:25">13:25</option>
              <option value="13:30">13:30</option>
              <option value="13:35">13:35</option>
              <option value="13:40">13:40</option>
            </select>
          </div>
          <GroupList
            onGroupClick={handleGroupClick}
            displayMode={displayMode}
            selectedTime={selectedTime}
          />
        </div>
        <div className="flex-1 p-4 overflow-y-auto border rounded-r-md border-[rgba(36,141,116,1)] mt-4 mr-2 group-detail">
          <GroupDetail groupName={selectedGroup} displayMode={displayMode} />
        </div>
      </div>
    </div>
  );
};

export default App;
