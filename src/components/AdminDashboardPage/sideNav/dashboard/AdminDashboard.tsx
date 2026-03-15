import { useAppSelector } from "@/Redux/hooks";
import { useMemo } from "react";
import type { Enrollment } from "@/Redux/slices/enrollmentSlice";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const countGraduatedStudents = (enrollments: Enrollment[]) => {
  const graduated = enrollments.filter((e) => e.status === "completed");
  return graduated.length;
};

const AdminDashboard = () => {
  const students = useAppSelector((state) => state.student.students);
  const courses = useAppSelector((state) => state.courses.items);
  // console.log("AdminDashboard - students:", students);.
  const categories = useAppSelector((state) => state.categories.items);
  console.log("AdminDashboard - categories:", categories);
  const enrollments = useAppSelector((state) => state.enrollments.items);
  console.log("AdminDashboard - enrollments:", enrollments);
  // const webDevelopnCategory =  categories.find

  console.log("AdminDashboard - courses:", courses);

  const monthlyData = useMemo(() => {
    const monthMap = new Map<
      string,
      { enrollments: number; revenue: number }
    >();
    enrollments.forEach((e) => {
      const date = new Date(e.enrolledAt);
      const month = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (!monthMap.has(month)) {
        monthMap.set(month, { enrollments: 0, revenue: 0 });
      }
      monthMap.get(month)!.enrollments += 1;
      monthMap.get(month)!.revenue += e.amount;
    });
    return Array.from(monthMap.entries()).map(([month, data]) => ({
      name: month,
      enrollments: data.enrollments,
      revenue: data.revenue,
    }));
  }, [enrollments]);

  const courseDistData = useMemo(() => {
    const catMap = new Map<string, { name: string; value: number }>();
    categories.forEach((cat) => {
      catMap.set(cat.id, { name: cat.name, value: 0 });
    });
    enrollments.forEach((e) => {
      const course = courses.find((c) => c.id === e.courseId);
      if (course) {
        const cat = categories.find((c) => c.id === course.categoryId);
        if (cat) {
          catMap.get(cat.id)!.value += 1;
        }
      }
    });
    return Array.from(catMap.values()).filter((d) => d.value > 0);
  }, [categories, courses, enrollments]);

  const topCoursesData = useMemo(() => {
    const courseMap = new Map<string, { name: string; enrollments: number }>();
    courses.forEach((c) =>
      courseMap.set(c.id, { name: c.title, enrollments: 0 }),
    );
    enrollments.forEach((e) => {
      if (courseMap.has(e.courseId)) {
        courseMap.get(e.courseId)!.enrollments += 1;
      }
    });
    return Array.from(courseMap.values())
      .sort((a, b) => b.enrollments - a.enrollments)
      .slice(0, 5);
  }, [courses, enrollments]);

  const statusData = useMemo(() => {
    const statusMap: Record<string, number> = {
      active: 0,
      completed: 0,
      pending: 0,
    };
    enrollments.forEach((e) => {
      if (statusMap[e.status] !== undefined) {
        statusMap[e.status] += 1;
      }
    });
    return Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [enrollments]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">
          Admin Overview
        </h1>
        <div className="text-sm text-gray-500">Welcome back, Admin</div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Students",
            value: students.length,
            icon: Users,
            trend: "+12.5%",
            isUp: true,
          },
          {
            label: "Active Courses",
            value: courses.length,
            icon: BookOpen,
            trend: "+3",
            isUp: true,
          },
          {
            label: "Total Revenue",
            value: enrollments
              .reduce((acc, e) => acc + e.amount, 0)
              .toLocaleString("en-US", { style: "currency", currency: "BDT" }),
            icon: DollarSign,
            trend: "-2.4%",
            isUp: false,
          },
          {
            label: "Graduated",
            value: countGraduatedStudents(enrollments),
            icon: GraduationCap,
            trend: "+18%",
            isUp: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="w-5 h-5 text-primary" />
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                  stat.isUp
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stat.isUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent enrollments */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Enrolments</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-semibold">Student</th>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollments.map((row, i) => {
                const enrolledStudent = students.find(
                  (s) => s.id === row.studentId,
                );
                const enrolledCourse = courses.find(
                  (c) => c.id === row.courseId,
                );
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">
                      {enrolledStudent ? enrolledStudent.name : "Not found"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {enrolledCourse ? enrolledCourse.title : "Not found"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{row.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          row.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Charts Row */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Course Distribution */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Course Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {courseDistData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {courseDistData.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Status */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">Enrollment Status</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusData.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-gray-600"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">
            Top Courses by Enrollment
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topCoursesData}
                  dataKey="enrollments"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => `${entry.name}: ${entry.enrollments}`}
                >
                  {topCoursesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Graph Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Enrollments */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Enrollments
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar
                  dataKey="enrollments"
                  fill="#C13333"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Revenue Trend
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C13333"
                  strokeWidth={2}
                  dot={{ fill: "#C13333", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
