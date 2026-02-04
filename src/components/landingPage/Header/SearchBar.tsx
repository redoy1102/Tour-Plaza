import { Search } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useLazySearchCoursesQuery } from "@/Redux/api/searchApi";
import SearchModal from "./SearchModal";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [trigger, { data: results = [], isLoading, isError }] =
    useLazySearchCoursesQuery();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Trigger search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim().length >= 2) {
      trigger(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, trigger]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isModalOpen = debouncedSearchTerm.trim().length >= 2;

  const handleCloseModal = useCallback(() => {
    setSearchTerm("");
  }, []);

  return (
    <>
      <div className="w-60">
        <div
          className="
        relative
        rounded-full
        p-px
        bg-size-[200%_300%]
        bg-linear-to-r
        from-blue-500
        via-pink-500
        to-purple-500
        animate-gradient
        focus-within:ring-0
        focus-within:ring-offset-0
      "
        >
          <div className="flex h-9 items-center gap-2 rounded-full bg-white px-4">
            {/* Search Icon */}
            <Search className="h-4 w-4 text-gray-700 shrink-0" />

            {/* Input */}
            <input
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="খুঁজুন কোর্স"
              className="ringHide h-7 flex-1
                            border-0
                            bg-transparent
                            text-sm
                            placeholder:text-gray-500
                            focus:ring-0
                            focus:ring-offset-0
                            focus-visible:ring-0
                            focus-visible:ring-offset-0
                          "
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SearchModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          searchTerm={debouncedSearchTerm}
          results={results}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </>
  );
};

export default SearchBar;
