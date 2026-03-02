import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, PlusCircle, Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  updateCourseOutline,
  setDraftOutline,
  type ClassItem,
  type WeekClasses,
} from "@/Redux/slices/courseSlice";
import PageHeader from "../shared/PageHeader";

// ─── helpers ────────────────────────────────────────────────────────────────

const emptyClass = (): ClassItem => ({
  title: "",
  description: "",
  ytVideoUrl: "",
});

// ─── component ──────────────────────────────────────────────────────────────

const CourseOutlinePage = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Preload: for existing courses read from the course itself; for new, from draftOutline.
  const existingCourse = useAppSelector((state) =>
    state.courses.items.find((c) => c.id === courseId)
  );
  const draftOutline = useAppSelector((state) => state.courses.draftOutline);

  const [weeks, setWeeks] = useState<WeekClasses[]>(
    (existingCourse?.courseOutline as WeekClasses[] | undefined) ??
      (courseId ? [] : draftOutline)
  );

  // ── week operations ────────────────────────────────────────────────────────

  const addWeek = () => {
    setWeeks((prev) => [...prev, [emptyClass()]]);
  };

  const removeWeek = (wIdx: number) => {
    setWeeks((prev) => prev.filter((_, i) => i !== wIdx));
  };

  // ── class operations ───────────────────────────────────────────────────────

  const addClassToWeek = (wIdx: number) => {
    setWeeks((prev) => {
      const updated = [...prev];
      updated[wIdx] = [...updated[wIdx], emptyClass()];
      return updated;
    });
  };

  const removeClass = (wIdx: number, cIdx: number) => {
    setWeeks((prev) => {
      const updated = [...prev];
      updated[wIdx] = updated[wIdx].filter((_, i) => i !== cIdx);
      return updated;
    });
  };

  const updateClass = (
    wIdx: number,
    cIdx: number,
    field: keyof ClassItem,
    val: string
  ) => {
    setWeeks((prev) =>
      prev.map((week, wi) =>
        wi === wIdx
          ? week.map((cls, ci) =>
              ci === cIdx ? { ...cls, [field]: val } : cls
            )
          : week
      )
    );
  };

  // ── save ──────────────────────────────────────────────────────────────────

  const handleSave = () => {
    if (courseId) {
      dispatch(updateCourseOutline({ id: courseId, outline: weeks }));
    } else {
      dispatch(setDraftOutline(weeks));
    }
    toast.success("Course outline saved!", { id: "outline-save" });
    navigate(
      courseId
        ? `/admin-dashboard/courses/edit/${courseId}`
        : "/admin-dashboard/courses/addCourse"
    );
  };

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="mt-12">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <PageHeader>Course Outline</PageHeader>

        <Button
          type="button"
          onClick={addWeek}
          className="bg-red-500 hover:bg-red-600 rounded-xl gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Week
        </Button>
      </div>

      {/* ── Empty state ── */}
      {weeks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <BookOpen className="w-14 h-14 mb-4 opacity-30" />
          <p className="text-lg font-medium">No weeks added yet</p>
          <p className="text-sm mt-1">
            Click &ldquo;Add Week&rdquo; in the top-right to get started.
          </p>
        </div>
      )}

      {/* ── Weeks ── */}
      <div className="space-y-6">
        {weeks.map((week, wIdx) => (
          <div
            key={wIdx}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Week header */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-base">
                Week {wIdx + 1}
              </h2>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeWeek(wIdx)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Remove Week
              </Button>
            </div>

            {/* Classes */}
            <div className="p-3 space-y-4">
              {week.map((cls, cIdx) => (
                <div
                  key={cIdx}
                  className="border border-gray-100 rounded-xl p-3 bg-gray-50/50"
                >
                  {/* Class header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Class {cIdx + 1}
                    </span>

                    {week.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClass(wIdx, cIdx)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded"
                        aria-label="Remove class"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <Input
                        placeholder="e.g. Introduction to Variables"
                        value={cls.title}
                        onChange={(e) =>
                          updateClass(wIdx, cIdx, "title", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Video URL
                      </label>
                      <Input
                        placeholder="https://youtube.com/..."
                        value={cls.ytVideoUrl}
                        onChange={(e) =>
                          updateClass(wIdx, cIdx, "ytVideoUrl", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Topics <span className="text-red-400">*</span>
                      </label>
                      <Input
                        placeholder="Topics covered in this class"
                        value={cls.description}
                        onChange={(e) =>
                          updateClass(wIdx, cIdx, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Class button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => addClassToWeek(wIdx)}
                className="w-full border-dashed border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-300 rounded-xl gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Class
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Save button ── */}
      {weeks.length > 0 && (
        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            className="bg-red-500 hover:bg-red-600 rounded-xl gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            Save Outline
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseOutlinePage;
