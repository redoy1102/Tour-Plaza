import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  BookOpen,
  Award,
  DollarSign,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { format } from "date-fns";

const CourseView = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courses = useAppSelector((state) => state.courses.items);
  const categories = useAppSelector((state) => state.categories.items);
  const tools = useAppSelector((state) => state.tools.items);
  const prerequisites = useAppSelector((state) => state.prerequisites.items);
  const instructors = useAppSelector((state) => state.instructors.items);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin-dashboard/courses/allCourses")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Button>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800">
            Course not found
          </h2>
          <p className="text-gray-600 mt-2">
            The course you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const categoryName =
    categories.find((c) => c.id === course.categoryId)?.name || "N/A";

  const toolIds = Array.isArray(course.toolsIds) ? course.toolsIds : [];
  const toolNames = tools
    .filter((t) => toolIds.includes(t.id))
    .map((t) => t.name);

  const prerequisitesIds = Array.isArray(course.prerequisitesIds)
    ? course.prerequisitesIds
    : [];
  const prerequisiteTitles = prerequisites
    .filter((p) => prerequisitesIds.includes(p.id))
    .map((p) => p.title);

  const instructorsIds = Array.isArray(course.instructorsIds)
    ? course.instructorsIds
    : [];
  const instructorNames = instructors
    .filter((i) => instructorsIds.includes(i.id))
    .map((i) => i.name);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin-dashboard/courses/allCourses")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <PageHeader>Course Details</PageHeader>
        </div>
      </div>

      {/* Course Banner */}
      {course.bannerImage && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
          <img
            src={course.bannerImage}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {course.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {categoryName}
                </span>
                {course.isFeatured && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Featured
                  </span>
                )}
                {course.isFreeCourse && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Free
                  </span>
                )}
                {toolNames && toolNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 ml-2">
                    {toolNames.map((n, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {course.bannerVideoLink && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Banner Video
                </h3>
                <a
                  href={course.bannerVideoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {course.bannerVideoLink}
                </a>
              </div>
            )}

            {course.seo && course.seo.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  SEO Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.seo.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Course Content Stats */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Course Content
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Live Classes</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {course.totalLiveClasses}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pre-Recorded Classes</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {course.totalPreRecordedClasses}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {course.courseDuration} months
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Seats</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {course.totalSeat}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Information
            </h3>

            {toolNames && toolNames.length > 0 && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Tool/Technology</span>
                <span className="font-medium text-gray-900">
                  {toolNames.join(", ")}
                </span>
              </div>
            )}

            {prerequisiteTitles && prerequisiteTitles.length > 0 && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Prerequisite</span>
                <span className="font-medium text-gray-900">
                  {prerequisiteTitles.join(", ")}
                </span>
              </div>
            )}

            {instructorNames && instructorNames.length > 0 && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Instructor</span>
                <span className="font-medium text-gray-900">
                  {instructorNames.join(", ")}
                </span>
              </div>
            )}

            {course.liveClassTime && (
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Live Class Time</span>
                <span className="font-medium text-gray-900">
                  {course.liveClassTime}
                </span>
              </div>
            )}

            {course.supportClassTime && (
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Support Class Time</span>
                <span className="font-medium text-gray-900">
                  {course.supportClassTime}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <span className="text-2xl font-bold text-gray-900">
                    {course.price}
                  </span>
                </div>
              </div>
              {course.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Discount</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                    <span className="text-xl font-semibold text-green-600">
                      {course.discount}
                    </span>
                  </div>
                </div>
              )}
              {course.discount > 0 && (
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-medium">
                      Final Price
                    </span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <span className="text-2xl font-bold text-red-600">
                        {course.price - course.discount}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Batch Info Card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Batch Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Batch Number</p>
                  <p className="text-lg font-semibold text-gray-900">
                    #{course.batchNumber}
                  </p>
                </div>
              </div>
              {course.startDate && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(new Date(course.startDate), "PPP")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
