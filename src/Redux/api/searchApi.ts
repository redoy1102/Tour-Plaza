import { createApi } from "@reduxjs/toolkit/query/react";
import type { Course } from "@/types/courses.interface";
import { courses } from "@/data/landingPage/courses";

// Client-side search implementation
const searchCourses = (searchTerm: string): Course[] => {
  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return courses.filter((course) => {
    const titleMatch = course.title
      .toLowerCase()
      .includes(normalizedSearchTerm);
    const categoryMatch = course.category
      .toLowerCase()
      .includes(normalizedSearchTerm);
    const descriptionMatch = course.description
      .toLowerCase()
      .includes(normalizedSearchTerm);
    const seoMatch = course.seo.some((keyword: string) =>
      keyword.toLowerCase().includes(normalizedSearchTerm)
    );

    return titleMatch || categoryMatch || descriptionMatch || seoMatch;
  });
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: async () => ({ data: null }),
  endpoints: (builder) => ({
    searchCourses: builder.query<Course[], string>({
      queryFn: (searchTerm) => {
        const results = searchCourses(searchTerm);
        return { data: results };
      },
    }),
  }),
});

export const { useSearchCoursesQuery, useLazySearchCoursesQuery } = searchApi;
