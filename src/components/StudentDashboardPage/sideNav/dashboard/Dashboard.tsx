import { useState } from "react";

import { performanceData } from "@/data/student/dashboardData";
import Header from "./Header";
import Stats from "./Stats";
import Charts from "./Charts";
import MarksTable from "./MarksTable";

const Dashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState("all");

  const filteredData =
    selectedWeek === "all"
      ? performanceData
      : performanceData.filter((d) => d.week === selectedWeek);

  const currentStats =
    selectedWeek === "all"
      ? {
          quiz: Math.round(
            performanceData.reduce((acc, curr) => acc + curr.quiz, 0)
          ),
          assignment: Math.round(
            performanceData.reduce((acc, curr) => acc + curr.assignment, 0)
          ),
          videoProgress: Math.round(
            performanceData.reduce((acc, curr) => acc + curr.videoProgress, 0) /
              performanceData.length
          ),
          totalObtainedMarks: Math.round(performanceData.reduce((acc, curr) => acc + curr.quiz + curr.assignment, 0)),
          totalMarks: performanceData.length * 200,
        }
      : {
          quiz: filteredData[0].quiz,
          assignment: filteredData[0].assignment,
          videoProgress: filteredData[0].videoProgress,
          totalObtainedMarks: filteredData[0].quiz + filteredData[0].assignment,
          totalMarks: 200,
        };

  return (
    <div className="space-y-8 pb-10">
      <Header selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
      <Stats currentStats={currentStats} />
      <Charts />
      <MarksTable filteredData={filteredData} />
    </div>
  );
};

export default Dashboard;
