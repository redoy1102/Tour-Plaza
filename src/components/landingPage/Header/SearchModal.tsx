import { X, Search as SearchIcon } from "lucide-react";
import type { Course } from "@/types/courses.interface";
import CourseCard from "../CoursesSection/CourseCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  results: Course[];
  isLoading: boolean;
  isError: boolean;
}

const SearchModal = ({
  isOpen,
  onClose,
  searchTerm,
  results,
  isLoading,
  isError,
}: SearchModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-50 max-h-[70vh] overflow-hidden animate-in slide-in-from-top duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              অনুসন্ধান ফলাফল
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(70vh-80px)] p-4">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
              <p className="mt-4 text-gray-500">খুঁজছি...</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <p className="text-red-500">কিছু ভুল হয়েছে। আবার চেষ্টা করুন।</p>
            </div>
          )}

          {!isLoading && !isError && searchTerm && results.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                "{searchTerm}" এর জন্য কোনো কোর্স পাওয়া যায়নি
              </p>
              <p className="text-gray-400 text-sm mt-2">
                অন্য কিছু খুঁজে দেখুন
              </p>
            </div>
          )}

          {!isLoading && !isError && results.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                {results.length} টি কোর্স পাওয়া গেছে
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((singleCourse, index) => (
                  <CourseCard key={index} singleCourse={singleCourse} index={index} closeSearchResultModal={onClose} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
