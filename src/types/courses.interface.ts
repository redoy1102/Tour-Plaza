export interface Course {
  id: number;
  category: string;
  title: string;
  description: string;
  rating: number;
  durationMonths: number;
  totalLiveClasses: number;
  totalPreRecordedVideos: number;
  price: number;
  discount?: number;
  link: string;
  imglink: string;
  heroVideoLink: string;

  supports: { icon: string; title: string }[];

  batchStartDate: string;
  liveClassTime: string;
  supportClassTime: string;

  totalSeats: number;
  seatsLeft: number;
  batch: string;
  isFeatured: boolean;

  instructors: Instructor[];
  supportTeamMembers: SupportTeamMember[];

  courseOutline: CourseOutline;

  toolsList: Tool[];

  prerequisites: Prerequisite[];

  reviews: Review[];

  promoCodes: {
    label: string;
    value: number;
  }[];

  seo: string[];
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
