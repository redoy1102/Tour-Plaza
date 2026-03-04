import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, PlusCircle, Save, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  updateCourseOutline,
  type Class as ClassItem,
  type Module,
} from "@/Redux/slices/courseSlice";
import PageHeader from "../shared/PageHeader";
import { Textarea } from "@/components/ui/textarea";

// ─── helpers ────────────────────────────────────────────────────────────────

const emptyClass = (): ClassItem => ({
  title: "",
  resources: "",
  ytVideoUrl: "",
});

const emptyModule = (): Module => ({
  moduleTitle: "",
  classes: [emptyClass()],
});

// ─── component ──────────────────────────────────────────────────────────────

type CourseOutlinePageProps = {
  value?: Module[];
  onChange?: (modules: Module[]) => void;
};

const CourseOutlinePage = ({ value, onChange }: CourseOutlinePageProps) => {
  const { courseId } = useParams<{ courseId: string }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isControlled = Boolean(onChange);

  // Preload: for existing courses read from the course itself.
  const existingCourse = useAppSelector((state) =>
    state.courses.items.find((c) => c.id === courseId)
  );

  const initialModules = useMemo(
    () => (existingCourse?.courseOutline as Module[] | undefined) ?? [],
    [existingCourse]
  );

  const [internalModules, setInternalModules] =
    useState<Module[]>(initialModules);

  const modules = isControlled ? value ?? [] : internalModules;

  const setModules = (
    updater: Module[] | ((prev: Module[]) => Module[])
  ) => {
    const next = typeof updater === "function" ? updater(modules) : updater;
    if (onChange) {
      onChange(next);
      return;
    }
    setInternalModules(next);
  };

  // ── module operations ──────────────────────────────────────────────────────
  const addModule = () => {
    setModules((prev) => [...prev, emptyModule()]);
  };

  const removeModule = (mIdx: number) => {
    setModules((prev) => prev.filter((_, i) => i !== mIdx));
  };

  const updateModuleTitle = (mIdx: number, val: string) => {
    setModules((prev) =>
      prev.map((module, mi) =>
        mi === mIdx ? { ...module, moduleTitle: val } : module
      )
    );
  };

  // ── class operations ───────────────────────────────────────────────────────
  const addClassToModule = (mIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const classes = updated[mIdx].classes ?? [];
      updated[mIdx] = {
        ...updated[mIdx],
        classes: [...classes, emptyClass()],
      };
      return updated;
    });
  };

  const removeClass = (mIdx: number, cIdx: number) => {
    setModules((prev) => {
      const updated = [...prev];
      const classes = updated[mIdx].classes ?? [];
      updated[mIdx] = {
        ...updated[mIdx],
        classes: classes.filter((_, i) => i !== cIdx),
      };
      return updated;
    });
  };

  const updateClass = (
    mIdx: number,
    cIdx: number,
    field: keyof ClassItem,
    val: string
  ) => {
    setModules((prev) =>
      prev.map((module, mi) =>
        mi === mIdx
          ? {
              ...module,
              classes: (module.classes ?? []).map((cls, ci) =>
                ci === cIdx ? { ...cls, [field]: val } : cls
              ),
            }
          : module
      )
    );
  };

  // ── save ──────────────────────────────────────────────────────────────────

  const handleSave = () => {
    if (!courseId) return;
    dispatch(updateCourseOutline({ id: courseId, outline: modules }));
    toast.success("Course outline saved!", { id: "outline-save" });
    navigate(
      courseId ? `/admin-dashboard/courses/edit/${courseId}` : "/"
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
          onClick={addModule}
          className="bg-red-500 hover:bg-red-600 rounded-xl gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Module
        </Button>
      </div>

      {/* ── Empty state ── */}
      {modules.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <BookOpen className="w-14 h-14 mb-4 opacity-30" />
          <p className="text-lg font-medium">No modules added yet</p>
          <p className="text-sm mt-1">
            Click &ldquo;Add Module&rdquo; in the top-right to get started.
          </p>
        </div>
      )}

      {/* ── Modules ── */}
      <div className="space-y-6">
        {modules.map((module, mIdx) => (
          <div
            key={mIdx}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Module header */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-gray-800 text-base">
                  Module {mIdx + 1}
                </h2>
                <Input
                  placeholder="Enter module title"
                  value={module.moduleTitle}
                  onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                  className="h-8 w-64"
                />
              </div>
              {/* Remove module button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeModule(mIdx)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg gap-1"
              >
                <Trash2 className="w-4 h-4" />
                Remove Module
              </Button>
            </div>

            {/* Classes */}
            <div className="p-3 space-y-4">
              {(module.classes ?? []).map((cls, cIdx) => (
                <div
                  key={cIdx}
                  className="border border-gray-100 rounded-xl p-3 bg-gray-50/50"
                >
                  {/* Class header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Class {cIdx + 1}
                    </span>

                    {(module.classes?.length ?? 0) > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClass(mIdx, cIdx)}
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
                          updateClass(mIdx, cIdx, "title", e.target.value)
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
                          updateClass(mIdx, cIdx, "ytVideoUrl", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1 block">
                        Resources
                      </label>
                      <Textarea
                        placeholder="Topics covered in this class"
                        value={cls.resources}
                        onChange={(e) =>
                          updateClass(mIdx, cIdx, "resources", e.target.value)
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
                onClick={() => addClassToModule(mIdx)}
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
      {!isControlled && Boolean(courseId) && modules.length > 0 && (
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
