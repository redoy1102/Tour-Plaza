import type { Course } from "@/types/courses.interface";
import {
  Users,
  Clock,
  ShieldCheck,
  Briefcase,
  LifeBuoy,
  Laptop,
  Globe,
  Wifi,
} from "lucide-react";

export const courses: Course[] = [
  {
    id: 1,
    category: "webDevelopment",
    title: "ওয়েব ডেভেলপমেন্ট",
    description: "শূন্য থেকে ফুল-স্ট্যাক ওয়েব ডেভেলপার হওয়ার সম্পূর্ণ কোর্স।",
    rating: 4.8,
    durationMonths: 6,
    totalLiveClasses: 50,
    totalPreRecordedVideos: 1000,
    price: 5000,
    discount: 500,
    link: "/courses/web-development",
    imglink: "/landingPage/courses/js.webp",
    heroVideoLink: "/landingPage/HeroVideo.mp4",

    supports: [
      { icon: "Users", title: "জব প্লেসমেন্ট সাপোর্ট" },
      { icon: "Clock", title: "লাইফটাইম এক্সেস" },
      { icon: "ShieldCheck", title: "সার্টিফিকেট" },
    ],
    batchStartDate: "রবিবার ৮ ফেব্রুয়ারি",
    liveClassTime: "সকাল ১০টা – দুপুর ১টা",
    supportClassTime: "রাত ৮টা – ১০টা",
    totalSeats: 50,
    seatsLeft: 20,
    batch: "৬ষ্ঠ ব্যাচে",

    isFeatured: true,

    instructors: [
      {
        name: "জন ডো",
        role: "ফুল-স্ট্যাক ডেভেলপার",
        photo: "/public/landingPage/courses/instructorImages/instructor1.webp",
        runningCompanyName: "Tech Solutions",
      },
      {
        name: "জেন স্মিথ",
        role: "ফ্রন্টএন্ড এক্সপার্ট",
        photo: "/public/landingPage/courses/instructorImages/instructor2.webp",
        runningCompanyName: "Creative Inc",
      },
      {
        name: "রাহাত ইসলাম",
        role: "ব্যাকএন্ড ডেভেলপার",
        photo: "/public/landingPage/courses/instructorImages/instructor3.webp",
        runningCompanyName: "Backend Hub",
      },
      {
        name: "তাসনিম রহমান",
        role: "DevOps ইঞ্জিনিয়ার",
        photo: "/public/landingPage/courses/instructorImages/instructor4.webp",
        runningCompanyName: "CloudWorks",
      },
    ],

    supportTeamMembers: [
      {
        name: "আলিফ রহমান",
        role: "টেক সাপোর্ট",
        photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
        runningCompanyName: "Support Ltd",
      },
      {
        name: "সাবিনা আক্তার",
        role: "কোর্স কনসালটেন্ট",
        photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
        runningCompanyName: "EduCare",
      },
    ],

    courseOutline: {
      week1: [
        {
          classNo: 1,
          title: "HTML পরিচিতি",
          topics: ["HTML Structure", "Tags"],
        },
        { classNo: 2, title: "CSS বেসিক", topics: ["Selectors", "Box Model"] },
      ],
      week2: [
        {
          classNo: 3,
          title: "JavaScript বেসিক",
          topics: ["Variables", "Functions"],
        },
        { classNo: 4, title: "DOM", topics: ["Events", "Manipulation"] },
      ],
      week3: [
        { classNo: 5, title: "React বেসিক", topics: ["Components", "Props"] },
        {
          classNo: 6,
          title: "State & Hooks",
          topics: ["useState", "useEffect"],
        },
      ],
      week4: [
        {
          classNo: 7,
          title: "Backend পরিচিতি",
          topics: ["Node.js", "Express"],
        },
        { classNo: 8, title: "MongoDB", topics: ["CRUD", "Schema"] },
      ],
    },

    toolsList: [
      {
        imgLink: "/public/landingPage/courses/tools/vsCode.jpeg",
        name: "VS Code",
        purpose: "কোড লেখা",
      },
      {
        imgLink: "/public/landingPage/courses/tools/github.png",
        name: "GitHub",
        purpose: "ভার্সন কন্ট্রোল",
      },
      {
        imgLink: "/public/landingPage/courses/tools/api.png",
        name: "API",
        purpose: "API টেস্টিং",
      },
    ],

    prerequisites: [
      { icon: "Laptop", title: "Laptop/Desktop" },
      { icon: "Globe", title: "Basic English" },
      { icon: "Wifi", title: "ইন্টারনেট ব্যবহারের জ্ঞান" },
    ],

    reviews: [
      { studentName: "রাহুল ইসলাম", rating: 5, comment: "অসাধারণ কোর্স!" },
      {
        studentName: "সুমনা আক্তার",
        rating: 4.7,
        comment: "খুব ভালো শেখানো হয়েছে।",
      },
      {
        studentName: "তানভীর হোসেন",
        rating: 4.8,
        comment: "লাইভ ক্লাস খুব উপকারী।",
      },
      {
        studentName: "মাহমুদুল হাসান",
        rating: 5,
        comment: "Highly recommended!",
      },
    ],

    promoCodes: [
      { label: "EarlyBird20", value: 20 },
      {
        label: "WEB26",
        value: 26,
      },
      { label: "CODEPRO15", value: 15 },
      { label: "DEVSTART5", value: 5 },
    ],
  },

  // {
  //   id: 2,
  //   category: "graphicDesign",
  //   title: "গ্রাফিক ডিজাইন",
  //   description: "প্রফেশনাল গ্রাফিক ডিজাইন শেখার পূর্ণাঙ্গ কোর্স।",
  //   rating: 4.6,
  //   durationMonths: 4,
  //   totalLiveClasses: 40,
  //   totalPreRecordedVideos: 1000,
  //   price: 4000,
  //   discountPrice: 3500,
  //   link: "/courses/graphic-design",
  //   imglink: "/landingPage/courses/graphics.webp",
  //   heroVideoLink: "/landingPage/HeroVideo.mp4",
  //   isFeatured: false,

  //   supports: [
  //     { icon: "LifeBuoy", title: "লাইফটাইম এক্সেস" },
  //     { icon: "Briefcase", title: "ফ্রিল্যান্স গাইডলাইন" },
  //     { icon: "ShieldCheck", title: "সার্টিফিকেট" },
  //   ],
  //   batchStartDate: "সোমবার ১২ ফেব্রুয়ারি",
  //   liveClassTime: "সন্ধ্যা ৭টা – ৯টা",
  //   supportClassTime: "রাত ৯টা",
  //   totalSeats: 40,
  //   seatsLeft: 15,
  //   batch: "৪র্থ ব্যাচে",

  //   instructors: [
  //     {
  //       name: "মেহেদী হাসান",
  //       role: "গ্রাফিক ডিজাইনার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor1.webp",
  //       runningCompanyName: "Design BD",
  //     },
  //     {
  //       name: "নাফিসা রহমান",
  //       role: "UI ডিজাইনার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor2.webp",
  //       runningCompanyName: "UX Studio",
  //     },
  //     {
  //       name: "আরিফ হোসেন",
  //       role: "ব্র্যান্ড ডিজাইনার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor3.webp",
  //       runningCompanyName: "BrandLab",
  //     },
  //     {
  //       name: "শাওন ইসলাম",
  //       role: "মোশন ডিজাইনার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor4.webp",
  //       runningCompanyName: "MotionX",
  //     },
  //   ],

  //   supportTeamMembers: [
  //     {
  //       name: "নিশাত তাসনিম",
  //       role: "স্টুডেন্ট সাপোর্ট",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //     {
  //       name: "রুবাইয়া ইসলাম",
  //       role: "কোর্স কোঅর্ডিনেটর",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //   ],

  //   courseOutline: {
  //     week1: [
  //       { classNo: 1, title: "ডিজাইন বেসিক", topics: ["Color Theory"] },
  //       { classNo: 2, title: "Typography", topics: ["Fonts", "Hierarchy"] },
  //     ],
  //     week2: [
  //       { classNo: 3, title: "Photoshop", topics: ["Tools", "Layers"] },
  //       { classNo: 4, title: "Illustrator", topics: ["Vector", "Icons"] },
  //     ],
  //     week3: [
  //       { classNo: 5, title: "Branding", topics: ["Logo", "Identity"] },
  //       { classNo: 6, title: "Social Media Design", topics: ["Posts", "Ads"] },
  //     ],
  //     week4: [
  //       { classNo: 7, title: "Client Work", topics: ["Brief", "Revision"] },
  //       { classNo: 8, title: "Portfolio", topics: ["Behance", "Dribbble"] },
  //     ],
  //   },

  //   toolsList: [
  //     {
  //       imgLink: "/public/landingPage/courses/tools/vsCode.jpeg   ",
  //       name: "Photoshop",
  //       purpose: "Image Editing",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/api.png",
  //       name: "Illustrator",
  //       purpose: "Vector Design",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/github.png",
  //       name: "Figma",
  //       purpose: "UI Design",
  //     },
  //   ],

  //   prerequisites: [
  //     { icon: "Laptop", title: "Laptop/Desktop" },
  //     { icon: "Lightbulb", title: "সৃজনশীল মন" },
  //   ],

  //   reviews: [
  //     {
  //       studentName: "সাদিয়া",
  //       rating: 4.5,
  //       comment: "খুব সুন্দর শেখানো হয়েছে।",
  //     },
  //     { studentName: "রিফাত", rating: 4.6, comment: "প্র্যাকটিক্যাল কোর্স।" },
  //     { studentName: "তানজিলা", rating: 4.7, comment: "Instructor খুব ভালো।" },
  //     {
  //       studentName: "নাসির",
  //       rating: 4.5,
  //       comment: "ফ্রিল্যান্স গাইডলাইন ভালো।",
  //     },
  //   ],

  //   promoCodes: [
  //     {
  //       label: "WEB2024",
  //       discountPercentage: 10,
  //     },
  //     { label: "CODEPRO", discountPercentage: 15 },
  //     { label: "DEVSTART", discountPercentage: 5 },
  //   ],
  // },

  // {
  //   id: 3,
  //   category: "digitalMarketing",
  //   title: "ডিজিটাল মার্কেটিং",
  //   description:
  //     "SEO, Facebook Ads, Google Ads এবং কনটেন্ট মার্কেটিং শেখার পূর্ণাঙ্গ কোর্স।",
  //   rating: 4.7,
  //   durationMonths: 3,
  //   totalLiveClasses: 30,
  //   totalPreRecordedVideos: 2000,
  //   price: 3000,
  //   discountPrice: 2500,
  //   link: "/courses/digital-marketing",
  //   imglink: "/landingPage/courses/digital_marketing.webp",
  //   heroVideoLink: "/landingPage/HeroVideo.mp4",

  //   supports: [
  //     { icon: "LifeBuoy", title: "লাইভ ক্যাম্পেইন" },
  //     { icon: "ShieldCheck", title: "সার্টিফিকেট" },
  //     { icon: "Briefcase", title: "জব প্রিপারেশন" },
  //   ],
  //   batchStartDate: "বৃহস্পতিবার ১৫ ফেব্রুয়ারি",
  //   liveClassTime: "রাত ৮টা – ১০টা",
  //   supportClassTime: "প্রতিদিন রাত ৯টা",
  //   totalSeats: 45,
  //   seatsLeft: 18,
  //   batch: "৫ম ব্যাচে",
  //   isFeatured: true,

  //   instructors: [
  //     {
  //       name: "আরিফুল ইসলাম",
  //       role: "ডিজিটাল মার্কেটার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor1.webp",
  //       runningCompanyName: "Growth Agency",
  //     },
  //     {
  //       name: "নাজমুল হাসান",
  //       role: "SEO স্পেশালিস্ট",
  //       photo: "/public/landingPage/courses/instructorImages/instructor2.webp",
  //       runningCompanyName: "SEO Lab",
  //     },
  //     {
  //       name: "ফারহান রহমান",
  //       role: "Ads Expert",
  //       photo: "/public/landingPage/courses/instructorImages/instructor3.webp",
  //       runningCompanyName: "AdsPro",
  //     },
  //     {
  //       name: "সাবিহা নূর",
  //       role: "Content Strategist",
  //       photo: "/public/landingPage/courses/instructorImages/instructor4.webp",
  //       runningCompanyName: "ContentX",
  //     },
  //   ],

  //   supportTeamMembers: [
  //     {
  //       name: "রাফিয়া খান",
  //       role: "কোর্স কোঅর্ডিনেটর",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //     {
  //       name: "সাজিদ হাসান",
  //       role: "স্টুডেন্ট সাপোর্ট",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //   ],

  //   courseOutline: {
  //     week1: [
  //       {
  //         classNo: 1,
  //         title: "ডিজিটাল মার্কেটিং পরিচিতি",
  //         topics: ["SEO", "SEM"],
  //       },
  //       {
  //         classNo: 2,
  //         title: "Audience Research",
  //         topics: ["Persona", "Analytics"],
  //       },
  //     ],
  //     week2: [
  //       { classNo: 3, title: "Facebook Ads", topics: ["Campaign", "Budget"] },
  //       { classNo: 4, title: "Google Ads", topics: ["Keywords", "Bidding"] },
  //     ],
  //     week3: [
  //       {
  //         classNo: 5,
  //         title: "Content Marketing",
  //         topics: ["Strategy", "Copywriting"],
  //       },
  //       {
  //         classNo: 6,
  //         title: "Email Marketing",
  //         topics: ["Funnels", "Automation"],
  //       },
  //     ],
  //     week4: [
  //       { classNo: 7, title: "Analytics", topics: ["GA4", "Reports"] },
  //       {
  //         classNo: 8,
  //         title: "Live Campaign",
  //         topics: ["Optimization", "Scaling"],
  //       },
  //     ],
  //   },

  //   toolsList: [
  //     {
  //       imgLink: "/public/landingPage/courses/tools/vsCode.jpeg",
  //       name: "Google Ads",
  //       purpose: "Paid Advertising",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/api.png",
  //       name: "Meta Ads Manager",
  //       purpose: "Social Ads",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/github.jpeg",
  //       name: "Google Analytics",
  //       purpose: "Performance Tracking",
  //     },
  //   ],

  //   prerequisites: [
  //     { icon: "Wifi", title: "ইন্টারনেট ব্যবহারের জ্ঞান" },
  //     { icon: "Globe", title: "Basic English" },
  //   ],

  //   reviews: [
  //     {
  //       studentName: "ইমরান হোসেন",
  //       rating: 4.7,
  //       comment: "লাইভ ক্যাম্পেইন দারুণ ছিল।",
  //     },
  //     { studentName: "সাবিনা", rating: 4.6, comment: "SEO অংশ খুব ভালো।" },
  //     {
  //       studentName: "রাশেদ",
  //       rating: 4.8,
  //       comment: "প্র্যাকটিক্যাল শেখানো হয়েছে।",
  //     },
  //     { studentName: "নিলয়", rating: 4.7, comment: "Instructor খুব হেল্পফুল।" },
  //   ],

  //   promoCodes: [
  //     {
  //       label: "WEB2024",
  //       discountPercentage: 10,
  //     },
  //     { label: "CODEPRO", discountPercentage: 15 },
  //     { label: "DEVSTART", discountPercentage: 5 },
  //   ],
  // },

  // {
  //   id: 4,
  //   category: "videoEditing",
  //   title: "ভিডিও এডিটিং",
  //   description:
  //     "Premiere Pro ও After Effects দিয়ে প্রফেশনাল ভিডিও এডিটিং কোর্স।",
  //   rating: 4.6,
  //   durationMonths: 2,
  //   totalLiveClasses: 24,
  //   totalPreRecordedVideos: 800,
  //   price: 2500,
  //   discountPrice: 2000,
  //   link: "/courses/video-editing",
  //   imglink: "/landingPage/courses/video_editing.webp",
  //   heroVideoLink: "/landingPage/HeroVideo.mp4",
  //   isFeatured: false,

  //   supports: [
  //     { icon: "LifeBuoy", title: "লাইফটাইম এক্সেস" },
  //     { icon: "Video", title: "প্র্যাকটিক্যাল প্রজেক্ট" },
  //     { icon: "ShieldCheck", title: "সার্টিফিকেট" },
  //   ],

  //   batchStartDate: "শনিবার ১০ ফেব্রুয়ারি",
  //   liveClassTime: "সন্ধ্যা ৬টা – ৮টা",
  //   supportClassTime: "রাত ৮টা",
  //   totalSeats: 30,
  //   seatsLeft: 12,
  //   batch: "৩য় ব্যাচে",

  //   instructors: [
  //     {
  //       name: "তৌহিদ ইসলাম",
  //       role: "ভিডিও এডিটর",
  //       photo: "/public/landingPage/courses/instructorImages/instructor1.webp",
  //       runningCompanyName: "Media House BD",
  //     },
  //     {
  //       name: "সাজিদ রহমান",
  //       role: "মোশন ডিজাইনার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor2.webp",
  //       runningCompanyName: "MotionX",
  //     },
  //     {
  //       name: "ফারহান কবির",
  //       role: "কালার গ্রেডার",
  //       photo: "/public/landingPage/courses/instructorImages/instructor3.webp",
  //       runningCompanyName: "ColorLab",
  //     },
  //     {
  //       name: "নাবিলা ইসলাম",
  //       role: "কনটেন্ট ক্রিয়েটর",
  //       photo: "/public/landingPage/courses/instructorImages/instructor4.webp",
  //       runningCompanyName: "Creator Hub",
  //     },
  //   ],

  //   supportTeamMembers: [
  //     {
  //       name: "ফারহানা ইয়াসমিন",
  //       role: "স্টুডেন্ট সাপোর্ট",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //     {
  //       name: "ইমরান হোসেন",
  //       role: "কোর্স কোঅর্ডিনেটর",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //   ],

  //   courseOutline: {
  //     week1: [
  //       {
  //         classNo: 1,
  //         title: "Premiere Pro পরিচিতি",
  //         topics: ["Timeline", "Cuts"],
  //       },
  //       { classNo: 2, title: "Transitions", topics: ["Effects", "Speed"] },
  //     ],
  //     week2: [
  //       { classNo: 3, title: "Color Grading", topics: ["LUT", "Correction"] },
  //       { classNo: 4, title: "Audio Editing", topics: ["Noise Reduction"] },
  //     ],
  //     week3: [
  //       { classNo: 5, title: "After Effects", topics: ["Motion", "Keyframes"] },
  //       { classNo: 6, title: "Text Animation", topics: ["Lower Thirds"] },
  //     ],
  //     week4: [
  //       { classNo: 7, title: "Client Project", topics: ["Workflow"] },
  //       { classNo: 8, title: "Export & Delivery", topics: ["Formats"] },
  //     ],
  //   },

  //   toolsList: [
  //     {
  //       imgLink: "/public/landingPage/courses/tools/api.png",
  //       name: "Premiere Pro",
  //       purpose: "ভিডিও এডিটিং",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/github.png",
  //       name: "After Effects",
  //       purpose: "মোশন গ্রাফিক্স",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/vsCode.jpeg",
  //       name: "Audition",
  //       purpose: "অডিও এডিটিং",
  //     },
  //   ],

  //   prerequisites: [
  //     { icon: "Laptop", title: "ভালো কম্পিউটার" },
  //     { icon: "Lightbulb", title: "সৃজনশীলতা" },
  //   ],

  //   reviews: [
  //     {
  //       studentName: "নাফিস",
  //       rating: 4.6,
  //       comment: "খুব প্র্যাকটিক্যাল কোর্স।",
  //     },
  //     { studentName: "রাফি", rating: 4.5, comment: "Editing শেখা সহজ হয়েছে।" },
  //     { studentName: "সুমন", rating: 4.7, comment: "Motion graphics দারুণ।" },
  //     { studentName: "মিথিলা", rating: 4.6, comment: "Instructor খুব ভালো।" },
  //   ],

  //   promoCodes: [
  //     {
  //       label: "WEB2024",
  //       discountPercentage: 10,
  //     },
  //     { label: "CODEPRO", discountPercentage: 15 },
  //     { label: "DEVSTART", discountPercentage: 5 },
  //   ],
  // },

  // {
  //   id: 5,
  //   category: "itSupport",
  //   title: "আইটি সাপোর্ট",
  //   description:
  //     "হার্ডওয়্যার, সফটওয়্যার ও নেটওয়ার্কিং-এর পূর্ণাঙ্গ আইটি সাপোর্ট কোর্স।",
  //   rating: 4.4,
  //   durationMonths: 3,
  //   totalLiveClasses: 28,
  //   totalPreRecordedVideos: 900,
  //   price: 3500,
  //   discountPrice: 2500,
  //   link: "/courses/it-support",
  //   imglink: "/landingPage/courses/video_editing.webp",
  //   heroVideoLink: "/landingPage/HeroVideo.mp4",
  //   isFeatured: true,

  //   supports: [
  //     { icon: "Users", title: "জব প্রিপারেশন" },
  //     { icon: "ShieldCheck", title: "সার্টিফিকেট" },
  //     { icon: "LifeBuoy", title: "লাইভ সাপোর্ট" },
  //   ],

  //   batchStartDate: "রবিবার ১৮ ফেব্রুয়ারি",
  //   liveClassTime: "সকাল ৯টা – ১১টা",
  //   supportClassTime: "রাত ১০টা",
  //   totalSeats: 35,
  //   seatsLeft: 9,
  //   batch: "২য় ব্যাচে",

  //   instructors: [
  //     {
  //       name: "সাইফুল ইসলাম",
  //       role: "IT Engineer",
  //       photo: "/public/landingPage/courses/instructorImages/instructor1.webp",
  //       runningCompanyName: "TechCare",
  //     },
  //     {
  //       name: "রাশেদ মাহমুদ",
  //       role: "Network Engineer",
  //       photo: "/public/landingPage/courses/instructorImages/instructor2.webp",
  //       runningCompanyName: "NetSolutions",
  //     },
  //     {
  //       name: "মাহবুব হাসান",
  //       role: "System Admin",
  //       photo: "/public/landingPage/courses/instructorImages/instructor3.webp",
  //       runningCompanyName: "SysAdmin Ltd",
  //     },
  //     {
  //       name: "তানভীর আহমেদ",
  //       role: "Hardware Specialist",
  //       photo: "/public/landingPage/courses/instructorImages/instructor4.webp",
  //       runningCompanyName: "HardTech",
  //     },
  //   ],

  //   supportTeamMembers: [
  //     {
  //       name: "মেহেদী হাসান",
  //       role: "টেক সাপোর্ট",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
  //       runningCompanyName: "TechCare",
  //     },
  //     {
  //       name: "নুসরাত জাহান",
  //       role: "স্টুডেন্ট সাপোর্ট",
  //       photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
  //       runningCompanyName: "EduCare",
  //     },
  //   ],

  //   courseOutline: {
  //     week1: [
  //       { classNo: 1, title: "কম্পিউটার বেসিক", topics: ["Hardware"] },
  //       { classNo: 2, title: "OS পরিচিতি", topics: ["Windows", "Linux"] },
  //     ],
  //     week2: [
  //       { classNo: 3, title: "Networking", topics: ["IP", "Router"] },
  //       { classNo: 4, title: "Troubleshooting", topics: ["Errors"] },
  //     ],
  //     week3: [
  //       { classNo: 5, title: "Security", topics: ["Antivirus"] },
  //       { classNo: 6, title: "Backup", topics: ["Recovery"] },
  //     ],
  //     week4: [
  //       { classNo: 7, title: "Client Support", topics: ["Tickets"] },
  //       { classNo: 8, title: "Job Prep", topics: ["Interview"] },
  //     ],
  //   },

  //   toolsList: [
  //     {
  //       imgLink: "/public/landingPage/courses/tools/api.png",
  //       name: "Windows OS",
  //       purpose: "System Management",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/github.png",
  //       name: "Linux",
  //       purpose: "Server Basics",
  //     },
  //     {
  //       imgLink: "/public/landingPage/courses/tools/vsCode.jpeg",
  //       name: "TeamViewer",
  //       purpose: "Remote Support",
  //     },
  //   ],

  //   prerequisites: [
  //     { icon: "Laptop", title: "Laptop/Desktop" },
  //     { icon: "Cpu", title: "বেসিক কম্পিউটার জ্ঞান" },
  //   ],

  //   reviews: [
  //     {
  //       studentName: "হাসান",
  //       rating: 4.4,
  //       comment: "নেটওয়ার্কিং ভালো শেখানো হয়েছে।",
  //     },
  //     { studentName: "রফিক", rating: 4.5, comment: "Job prep অংশ ভালো।" },
  //     { studentName: "সাজিদ", rating: 4.3, comment: "Instructor helpful।" },
  //     { studentName: "নাসির", rating: 4.4, comment: "Practical course।" },
  //   ],

  //   promoCodes: [
  //     {
  //       label: "WEB2024",
  //       discountPercentage: 10,
  //     },
  //     { label: "CODEPRO", discountPercentage: 15 },
  //     { label: "DEVSTART", discountPercentage: 5 },
  //   ],
  // },
];

export const featuredCourses = courses.filter((course) => course.isFeatured);

export const getIcon = (iconString: string) => {
  let IconComponent;
  switch (iconString) {
    case "Users":
      IconComponent = Users;
      break;
    case "Clock":
      IconComponent = Clock;
      break;
    case "ShieldCheck":
      IconComponent = ShieldCheck;
      break;
    case "Briefcase":
      IconComponent = Briefcase;
      break;
    case "LifeBuoy":
      IconComponent = LifeBuoy;
      break;
    case "Laptop":
      IconComponent = Laptop;
      break;
    case "Globe":
      IconComponent = Globe;
      break;
    case "Wifi":
      IconComponent = Wifi;
      break;
    default:
      IconComponent = Users;
  }
  return IconComponent;
};
