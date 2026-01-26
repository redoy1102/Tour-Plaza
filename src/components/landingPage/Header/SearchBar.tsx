import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="hidden md:block w-60">
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
    );
};

export default SearchBar;