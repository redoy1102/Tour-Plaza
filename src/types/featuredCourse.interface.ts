export interface FeaturedCourse {
  id: number;
  category: string;
  title: string;
  description: string;
  rating: number;

  durationMonths: number;
  totalVideos: number;
  price: number;

  link: string;
  imglink: string;
  heroVideoLink: string;

  supports: string[];

  batchStartDate: string;
  liveClassTime: string;
  supportClassTime: string;

  totalSeats: number;
  seatsLeft: number;
  batch: string;

  instructors: Instructor[];
  supportTeamMembers: SupportTeamMember[];

  courseOutline: CourseOutline;

  toolsList: Tool[];

  prerequisites: Prerequisite[];

  reviews: Review[];

  promoCodes: string[];
}

export interface Instructor {
  name: string;
  role: string;
  photo: string;
  runningCompanyName: string;
}

export interface SupportTeamMember {
  name: string;
  role: string;
  photo: string;
  runningCompanyName: string;
}

export interface CourseClass {
  classNo: number;
  title: string;
  topics: string[];
}

export interface CourseOutline {
  week1: CourseClass[];
  week2: CourseClass[];
  week3: CourseClass[];
  week4: CourseClass[];
}

export interface Tool {
  imgLink: string;
  name: string;
  purpose: string;
}

export interface Prerequisite {
  icon: string;
  title: string;
}

export interface Review {
  studentName: string;
  rating: number;
  comment: string;
}