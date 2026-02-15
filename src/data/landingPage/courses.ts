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
    title: "ওয়েব ডেভেলপমেন্ট - MERN",
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
    isFreeCourse: false,

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

    seo: [
      "mern stack",
      "mern stack developer",
      "mern stack course",
      "mern stack training",
      "full stack web development",
      "full stack developer",
      "javascript",
      "js",
      "react",
      "react js",
      "node",
      "node js",
      "express",
      "express js",
      "mongodb",
      "mongo db",
      "mongo",
      "mongoose",
      "rest api",
      "api development",
      "backend development",
      "frontend development",
      "web application development",
      "single page application",
      "spa",
      "react hooks",
      "redux",
      "context api",
      "jwt authentication",
      "user authentication",
      "authorization",
      "mern project",
      "real world projects",
      "portfolio projects",
      "job ready course",
      "software engineer",
      "web developer job",
      "it training institute",
      "online coding course",
      "learn mern stack",
      "mern stack bangladesh",
      "mern stack course in bangladesh",
    ],
  },

  {
    id: 2,
    category: "webDevelopment",
    title: "ওয়েব ডেভেলপমেন্ট - [Python & Django]",
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
    isFreeCourse: false,

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

    seo: [
      "python",
      "python course",
      "learn python",
      "django",
      "django course",
      "django web development",
      "python django",
      "python django course",
      "backend development",
      "backend developer",
      "full stack development",
      "full stack web development",
      "web development",
      "web application development",
      "server side development",
      "rest api",
      "django rest framework",
      "drf",
      "api development",
      "authentication",
      "authorization",
      "jwt authentication",
      "database design",
      "postgresql",
      "mysql",
      "sqlite",
      "orm",
      "django orm",
      "mvc",
      "mtv architecture",
      "deployment",
      "docker",
      "aws",
      "heroku",
      "real world projects",
      "portfolio projects",
      "job ready course",
      "software engineer",
      "backend engineer",
      "python developer",
      "django developer",
      "python django developer",
      "online coding course",
      "it training institute",
      "learn backend development",
      "django course in bangladesh",
      "python django course in bangladesh",
    ],
  },

  {
    id: 3,
    category: "graphicDesign",
    title: "গ্রাফিক ডিজাইন - [Adobe Photoshop & Illustrator]",
    description: "প্রফেশনাল গ্রাফিক ডিজাইন শেখার পূর্ণাঙ্গ কোর্স।",
    rating: 4.5,
    durationMonths: 3,
    totalLiveClasses: 60,
    totalPreRecordedVideos: 1000,
    price: 5000,
    discount: 500,
    link: "/courses/graphic-design",
    imglink: "/landingPage/courses/graphics.webp",
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
    isFreeCourse: false,

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

    seo: [
      "graphic design",
      "graphic design course",
      "learn graphic design",
      "graphic designer",
      "professional graphic design",
      "creative design",
      "visual design",
      "digital design",
      "branding",
      "logo design",
      "banner design",
      "social media design",
      "poster design",
      "flyer design",
      "brochure design",
      "print design",
      "ui design",
      "basic ui ux",
      "adobe photoshop",
      "photoshop",
      "adobe illustrator",
      "illustrator",
      "figma",
      "canva",
      "design principles",
      "color theory",
      "typography",
      "layout design",
      "vector design",
      "image editing",
      "photo manipulation",
      "mockup design",
      "real world projects",
      "portfolio design",
      "freelancing",
      "freelance graphic designer",
      "online graphic design course",
      "it training institute",
      "graphic design course in bangladesh",
      "learn graphic design online",
      "job ready graphic design course",
    ],
  },

  {
    id: 4,
    category: "programming",
    title: "C Programming",
    description: "প্রফেশনাল C প্রোগ্রামিং শেখার পূর্ণাঙ্গ কোর্স।",
    rating: 4.5,
    // durationMonths: 3,
    // totalLiveClasses: 60,
    totalPreRecordedVideos: 90,
    // price: 5000,
    // discount: 500,
    link: "/courses/graphic-design",
    imglink: "/landingPage/courses/graphics.webp",
    heroVideoLink: "/landingPage/HeroVideo.mp4",

    // supports: [
    //   { icon: "Users", title: "জব প্লেসমেন্ট সাপোর্ট" },
    //   { icon: "Clock", title: "লাইফটাইম এক্সেস" },
    //   { icon: "ShieldCheck", title: "সার্টিফিকেট" },
    // ],
    // batchStartDate: "রবিবার ৮ ফেব্রুয়ারি",
    // liveClassTime: "সকাল ১০টা – দুপুর ১টা",
    // supportClassTime: "রাত ৮টা – ১০টা",
    // totalSeats: 50,
    // seatsLeft: 20,
    // batch: "৬ষ্ঠ ব্যাচে",

    isFeatured: true,
    isFreeCourse: true,

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

    // supportTeamMembers: [
    //   {
    //     name: "আলিফ রহমান",
    //     role: "টেক সাপোর্ট",
    //     photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
    //     runningCompanyName: "Support Ltd",
    //   },
    //   {
    //     name: "সাবিনা আক্তার",
    //     role: "কোর্স কনসালটেন্ট",
    //     photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
    //     runningCompanyName: "EduCare",
    //   },
    // ],

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

    // promoCodes: [
    //   { label: "EarlyBird20", value: 20 },
    //   {
    //     label: "WEB26",
    //     value: 26,
    //   },
    //   { label: "CODEPRO15", value: 15 },
    //   { label: "DEVSTART5", value: 5 },
    // ],

    seo: [
      "c programming",
      "c programming course",
      "learn c programming",
      "c language",
      "c language course",
      "c programming for beginners",
      "advanced c programming",
      "structured programming",
      "procedural programming",
      "programming fundamentals",
      "basic programming",
      "coding for beginners",
      "computer programming",
      "c syntax",
      "variables in c",
      "data types in c",
      "operators in c",
      "control statements",
      "loops in c",
      "if else in c",
      "switch case in c",
      "functions in c",
      "recursion in c",
      "arrays in c",
      "strings in c",
      "pointers in c",
      "dynamic memory allocation",
      "malloc free",
      "structures in c",
      "file handling in c",
      "c projects",
      "real world programming projects",
      "problem solving",
      "algorithm basics",
      "competitive programming",
      "data structures using c",
      "object oriented concepts in c",
      "debugging in c",
      "gcc compiler",
      "visual studio code for c",
      "coding interview preparation",
      "software development basics",
      "computer science fundamentals",
      "c programming course in bangladesh",
      "online c programming course",
      "job ready programming course",
    ],
  },
  {
    id: 5,
    category: "programming",
    title: "C++ Programming",
    description: "প্রফেশনাল C++ প্রোগ্রামিং শেখার পূর্ণাঙ্গ কোর্স।",
    rating: 4.1,
    // durationMonths: 3,
    // totalLiveClasses: 60,
    totalPreRecordedVideos: 204,
    // price: 5000,
    // discount: 500,
    link: "/courses/graphic-design",
    imglink: "/landingPage/courses/graphics.webp",
    heroVideoLink: "/landingPage/HeroVideo.mp4",

    // supports: [
    //   { icon: "Users", title: "জব প্লেসমেন্ট সাপোর্ট" },
    //   { icon: "Clock", title: "লাইফটাইম এক্সেস" },
    //   { icon: "ShieldCheck", title: "সার্টিফিকেট" },
    // ],
    // batchStartDate: "রবিবার ৮ ফেব্রুয়ারি",
    // liveClassTime: "সকাল ১০টা – দুপুর ১টা",
    // supportClassTime: "রাত ৮টা – ১০টা",
    // totalSeats: 50,
    // seatsLeft: 20,
    // batch: "৬ষ্ঠ ব্যাচে",

    isFeatured: true,
    isFreeCourse: true,

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

    // supportTeamMembers: [
    //   {
    //     name: "আলিফ রহমান",
    //     role: "টেক সাপোর্ট",
    //     photo: "/public/landingPage/courses/teamMemberImages/teamMember1.webp",
    //     runningCompanyName: "Support Ltd",
    //   },
    //   {
    //     name: "সাবিনা আক্তার",
    //     role: "কোর্স কনসালটেন্ট",
    //     photo: "/public/landingPage/courses/teamMemberImages/teamMember2.webp",
    //     runningCompanyName: "EduCare",
    //   },
    // ],

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

    // promoCodes: [
    //   { label: "EarlyBird20", value: 20 },
    //   {
    //     label: "WEB26",
    //     value: 26,
    //   },
    //   { label: "CODEPRO15", value: 15 },
    //   { label: "DEVSTART5", value: 5 },
    // ],

    seo: [
      "c programming",
      "c programming course",
      "learn c programming",
      "c language",
      "c language course",
      "c programming for beginners",
      "advanced c programming",
      "structured programming",
      "procedural programming",
      "programming fundamentals",
      "basic programming",
      "coding for beginners",
      "computer programming",
      "c syntax",
      "variables in c",
      "data types in c",
      "operators in c",
      "control statements",
      "loops in c",
      "if else in c",
      "switch case in c",
      "functions in c",
      "recursion in c",
      "arrays in c",
      "strings in c",
      "pointers in c",
      "dynamic memory allocation",
      "malloc free",
      "structures in c",
      "file handling in c",
      "c projects",
      "real world programming projects",
      "problem solving",
      "algorithm basics",
      "competitive programming",
      "data structures using c",
      "object oriented concepts in c",
      "debugging in c",
      "gcc compiler",
      "visual studio code for c",
      "coding interview preparation",
      "software development basics",
      "computer science fundamentals",
      "c programming course in bangladesh",
      "online c programming course",
      "job ready programming course",
    ],
  },
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
