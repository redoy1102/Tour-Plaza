import type { Course } from "@/types/landingPage.interface";

export const courses: Course[] = [
  {
    id: 1,
    category: "webDevelopment",
    label: "ওয়েব ডেভেলপমেন্ট",
    link: "/courses/web-development",
  },
  {
    id: 2,
    category: "graphicDesign",
    label: "গ্রাফিক ডিজাইন",
    link: "/courses/graphic-design",
  },
  {
    id: 3,
    category: "digitalMarketing",
    label: "ডিজিটাল মার্কেটিং",
    link: "/courses/digital-marketing",
  },
  {
    id: 4,
    category: "videoEditing",
    label: "ভিডিও এডিটিং",
    link: "/courses/video-editing",
  },
  { id:5, category: "itSupport", label: "আইটি সাপোর্ট", link: "/courses/it-support" },
  {
    id: 6,
    category: "appDevelopment",
    label: "অ্যাপ ডেভেলপমেন্ট",
    link: "/courses/app-development",
  },
  {
    id: 7,
    category: "3DAnimation",
    label: "3D অ্যানিমেশন",
    link: "/courses/3d-animation",
  },
  {
    id: 8,
    category: "dataEngineering",
    label: "ডাটা ইঞ্জিনিয়ারিং",
    link: "/courses/data-engineering",
  },
  {
    id: 9,
    category: "artificialIntelligence",
    label: "কৃত্রিম বুদ্ধিমত্তা",
    link: "/courses/artificial-intelligence",
  }
];

export const featuredCourses = [
  {
    id: 1,
    category: "webDevelopment",
    title: "ওয়েব ডেভেলপমেন্ট",
    duration: 6,
    totalVideos: 50,
    price: 5000,
    link: "/courses/web-development",
    imglink: "/landingPage/courses/js.webp",
  },
  {
    id: 2,
    category: "graphicDesign",
    title: "গ্রাফিক ডিজাইন",
    duration: 4,
    totalVideos: 40,
    price: 4000,
    link: "/courses/graphic-design",
    imglink: "/landingPage/courses/graphics.webp",
  },
  {
    id: 3,
    category: "digitalMarketing",
    title: "ডিজিটাল মার্কেটিং",
    duration: 3,
    totalVideos: 30,
    price: 3000,
    link: "/courses/digital-marketing",
    imglink: "/landingPage/courses/digital_marketing.webp",
  },
  {
    id: 4,
    category: "videoEditing",
    title: "ভিডিও এডিটিং",
    duration: 2,
    totalVideos: 20,
    price: 2000,
    link: "/courses/video-editing",
    imglink: "/landingPage/courses/video_editing.webp",
  },
  {
    id: 5,
    category: "itSupport",
    title: "আইটি সাপোর্ট",
    duration: 3,
    totalVideos: 25,
    price: 3500,
    link: "/courses/it-support",
    imglink: "/landingPage/courses/video_editing.webp",
  },
  {
    id: 6,
    category: "appDevelopment",
    title: "অ্যাপ ডেভেলপমেন্ট",
    duration: 5,
    totalVideos: 45,
    price: 6000,
    link: "/courses/app-development",
    imglink: "/landingPage/courses/video_editing.webp",
  }
]
