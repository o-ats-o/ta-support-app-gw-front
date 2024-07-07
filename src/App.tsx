import React, { useState } from "react";
import GroupList from "./components/GroupList";
import GroupDetail from "./components/GroupDetail";
import Header from "./components/Header";

const App: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState("Group A");
  const [displayMode, setDisplayMode] = useState("発話回数");

  const handleGroupClick = (group: string) => {
    setSelectedGroup(group);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-16 p-2" style={{ minHeight: "100vh" }}>
        <div className="w-2/5 p-4 border rounded-l-md border-[rgba(36,141,116,1)] mt-4 ml-2 group-list">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setDisplayMode("発話回数")}
              className={`px-4 py-2 w-full ${
                displayMode === "発話回数" ? "bg-green-300" : "bg-white"
              }`}
            >
              発話回数
            </button>
            <button
              onClick={() => setDisplayMode("感情")}
              className={`px-4 py-2 w-full ${
                displayMode === "感情" ? "bg-green-300" : "bg-white"
              }`}
            >
              感情
            </button>
          </div>
          <GroupList
            onGroupClick={handleGroupClick}
            displayMode={displayMode}
          />
        </div>
        <div className="flex-1 p-4 overflow-y-auto border rounded-r-md border-[rgba(36,141,116,1)] mt-4 group-detail">
          <GroupDetail groupName={selectedGroup} displayMode={displayMode} />
        </div>
      </div>
    </div>
  );
};

export default App;
