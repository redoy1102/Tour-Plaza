import { useState, useMemo } from "react";

import { useAppSelector } from "@/Redux/hooks";
import Header from "./Header";
import Stats from "./Stats";
import Charts from "./Charts";
import MarksTable from "./MarksTable";

// Convert "week1" → "সপ্তাহ ১", "week12" → "সপ্তাহ ১২" etc.
const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const toBengaliNumber = (n: number) =>
  String(n)
    .split("")
    .map((d) => bengaliDigits[parseInt(d)])
    .join("");

const weekKeyToLabel = (key: string) => {
  const num = parseInt(key.replace(/\D/g, ""), 10);
  return isNaN(num) ? key : `সপ্তাহ ${toBengaliNumber(num)}`;
};

const Dashboard = () => {
  const currentStudent = useAppSelector((s) => s.student.currentStudent);
  const enrollments = useAppSelector((s) => s.enrollments.items);

  // All enrollments belonging to the logged-in student
  const studentEnrollments = useMemo(
    () => enrollments.filter((e) => e.studentId === currentStudent?.id),
    [enrollments, currentStudent],
  );

  // Build per-week performance rows from real quiz & assignment marks
  const performanceData = useMemo(() => {
    const weekMap: Record<
      string,
      { quiz: number; assignment: number; videoProgress: number }
    > = {};

    for (const enrollment of studentEnrollments) {
      for (const qm of enrollment.quizMarks ?? []) {
        if (!weekMap[qm.quizWeekId])
          weekMap[qm.quizWeekId] = { quiz: 0, assignment: 0, videoProgress: 0 };
        weekMap[qm.quizWeekId].quiz = Math.round(
          (qm.score / qm.totalQuestions) * 100,
        );
      }
      for (const am of enrollment.assignmentMarks ?? []) {
        if (!weekMap[am.assignmentWeekId])
          weekMap[am.assignmentWeekId] = {
            quiz: 0,
            assignment: 0,
            videoProgress: 0,
          };
        weekMap[am.assignmentWeekId].assignment = am.marks ?? 0;
      }
    }

    return Object.entries(weekMap)
      .sort(([a], [b]) => {
        const numA = parseInt(a.replace(/\D/g, ""), 10);
        const numB = parseInt(b.replace(/\D/g, ""), 10);
        return numA - numB;
      })
      .map(([key, val]) => ({ week: weekKeyToLabel(key), ...val }));
  }, [studentEnrollments]);

  const [selectedWeek, setSelectedWeek] = useState("all");

  const filteredData =
    selectedWeek === "all"
      ? performanceData
      : performanceData.filter((d) => d.week === selectedWeek);

  const currentStats = useMemo(() => {
    if (selectedWeek === "all") {
      return {
        quiz: performanceData.reduce((acc, d) => acc + d.quiz, 0),
        assignment: performanceData.reduce((acc, d) => acc + d.assignment, 0),
        videoProgress:
          performanceData.length > 0
            ? Math.round(
                performanceData.reduce((acc, d) => acc + d.videoProgress, 0) /
                  performanceData.length,
              )
            : 0,
        totalObtainedMarks: performanceData.reduce(
          (acc, d) => acc + d.quiz + d.assignment,
          0,
        ),
        totalMarks: performanceData.length * 200,
      };
    }
    const row = filteredData[0];
    if (!row) {
      return {
        quiz: 0,
        assignment: 0,
        videoProgress: 0,
        totalObtainedMarks: 0,
        totalMarks: 200,
      };
    }
    return {
      quiz: row.quiz,
      assignment: row.assignment,
      videoProgress: row.videoProgress,
      totalObtainedMarks: row.quiz + row.assignment,
      totalMarks: 200,
    };
  }, [selectedWeek, filteredData, performanceData]);

  return (
    <div className="space-y-8 pb-10">
      <Header
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
        performanceData={performanceData}
      />
      <Stats currentStats={currentStats} />
      <Charts performanceData={performanceData} />
      <MarksTable filteredData={filteredData} />
    </div>
  );
};

export default Dashboard;
