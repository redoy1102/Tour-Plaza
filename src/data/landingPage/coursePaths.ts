import type { CoursePath } from "@/types/landingPage.interface";

export const coursePaths: CoursePath[] = [
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
  {
    id: 5,
    category: "itSupport",
    label: "আইটি সাপোর্ট",
    link: "/courses/it-support",
  },
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
  },
  {
    id: 10,
    category: "programming",
    label: "প্রোগ্রামিং",
    link: "/courses/programming",
  }
];

// export const featuredCourses = [
//   {
//     id: 1,
//     category: "webDevelopment",
//     title: "ওয়েব ডেভেলপমেন্ট",
//     description:
//       "সম্পূর্ণ ওয়েব ডেভেলপমেন্ট কোর্স যা আপনাকে শূন্য থেকে একজন দক্ষ ওয়েব ডেভেলপার হিসেবে গড়ে তুলবে।",
//     rating: 4.8,
//     durationMonths: 6,
//     totalVideos: 50,
//     price: 5000,
//     link: "/courses/web-development",
//     imglink: "/landingPage/courses/js.webp",
//     supports: [
//       "জব প্লেসমেন্ট সাপোর্ট",
//       "লাইফটাইম এক্সেস",
//       "সার্টিফিকেট প্রদান",
//     ],
//     batchStartDate: "রবিবার ৮ ফেব্রুয়ারি",
//     liveClassTime: "সকাল ১০টা থেকে দুপুর ১টা পর্যন্ত (রবি,মঙ্গল,বৃহস্পতি)",
//     supportClassTime:
//       "রবি, মঙ্গল, বৃহস্পতি রাত ১০ টায় এবং শনি থেকে বৃহস্পতি রাত ৮ টা",
//     totalSeats: 50,
//     seatsLeft: 20,
//     batch: "৬ষ্ঠ ব্যাচে",
//     instructors: [
//       {
//         name: "জন ডো",
//         role: "সিনিয়র ওয়েব ডেভেলপার",
//         photo: "/landingPage/instructors/john_doe.webp",
//         runningCompanyName: "Tech Solutions Ltd.",
//       },
//       {
//         name: "জেন স্মিথ",
//         role: "ফ্রন্টএন্ড বিশেষজ্ঞ",
//         photo: "/landingPage/instructors/jane_smith.webp",
//         runningCompanyName: "Creative Designs Inc.",
//       },
//     ],
//     supportTeamMembers: [
//       {
//         name: "আলিফ রহমান",
//         role: "টেকনিক্যাল সাপোর্ট",
//         photo: "/landingPage/instructors/alif_rahman.webp",
//         runningCompanyName: "Support Solutions Ltd.",
//       },
//       {
//         name: "সাবিনা আক্তার",
//         role: "কোর্স কনসালটেন্ট",
//         photo: "/landingPage/instructors/sabina_akter.webp",
//         runningCompanyName: "EduCare Consultants",
//       },
//     ],
//     courseOutline: {
//       week1: [
//         {
//           classNo: 1,
//           title: "HTML এর পরিচিতি এবং বেসিক স্ট্রাকচার",
//           topics: [
//             "HTML কি এবং কেন প্রয়োজন",
//             "HTML ডকুমেন্টের স্ট্রাকচার",
//             "বিভিন্ন HTML ট্যাগের ব্যবহার",
//           ],
//         },
//         {
//           classNo: 2,
//           title: "CSS এর বেসিক এবং স্টাইলিং",
//           topics: [
//             "CSS কি এবং কিভাবে কাজ করে",
//             "বিভিন্ন সিলেক্টর এবং প্রপার্টি",
//             "স্টাইলিং টেক্সট, ব্যাকগ্রাউন্ড, এবং লেআউট",
//           ],
//         },
//       ],
//       week2: [
//         {
//           classNo: 3,
//           title: "জাভাস্ক্রিপ্টের বেসিক ধারণা",
//           topics: [
//             "জাভাস্ক্রিপ্ট কি এবং এর গুরুত্ব",
//             "ভেরিয়েবল, ডেটা টাইপস, এবং অপারেটর",
//             "ফাংশন এবং ইভেন্ট হ্যান্ডলিং",
//           ],
//         },
//         {
//           classNo: 4,
//           title: "DOM ম্যানিপুলেশন এবং ইভেন্টস",
//           topics: [
//             "ডকুমেন্ট অবজেক্ট মডেল (DOM) কি",
//             "DOM এলিমেন্ট সিলেকশন এবং ম্যানিপুলেশন",
//             "ইভেন্ট লিসেনার যোগ করা এবং ইভেন্ট হ্যান্ডলিং",
//           ],
//         },
//       ],
//     },
//     toolsList: [
//       {
//         imgLink: "/landingPage/courses/tools/vs_code.png",
//         name: "Visual Studio Code",
//         purpose: "কোড এডিটিং এবং ডেভেলপমেন্ট",
//       },
//       {
//         imgLink: "/landingPage/courses/tools/github.png",
//         name: "Git এবং GitHub",
//         purpose: "ভার্সন কন্ট্রোল এবং কোড হোস্টিং",
//       },
//       {
//         imgLink: "/landingPage/courses/tools/chrome_devtools.png",
//         name: "Chrome DevTools",
//         purpose: "ব্রাউজার ডিবাগিং এবং টেস্টিং",
//       },
//     ],
//     prerequisites: [
//       {
//         icon: "",
//         title: "Laptop/Desktop"
//       },
//       {
//         icon: "",
//         title: "Basic English Knowledge"
//       },
//       {
//         icon: "",
//         title: "ভালো ইন্টারনেট কানেকশন"
//       }
//     ],
//     reviews: [
//       {
//         studentName: "রাহুল ইসলাম",
//         rating: 5,
//         comment:
//           "এই কোর্সটি আমার ওয়েব ডেভেলপমেন্ট ক্যারিয়ার শুরু করার জন্য একদম পারফেক্ট ছিল। ইন্সট্রাক্টররা খুবই সহায়ক এবং বিষয়বস্তু খুবই বিস্তারিত।",
//       },
//       {
//         studentName: "সুমনা আক্তার",
//         rating: 4.5,
//         comment:
//           "কোর্সের মাধ্যমে আমি জাভাস্ক্রিপ্টে অনেক কিছু শিখেছি। লাইভ ক্লাসগুলো খুবই ইন্টারেক্টিভ এবং প্র্যাকটিক্যাল ছিল।",
//       },
//       {
//         studentName: "তানভীর হোসেন",
//         rating: 4.8,
//         comment:
//           "আমি এই কোর্সের মাধ্যমে আমার ওয়েব ডেভেলপমেন্ট স্কিলগুলো অনেক উন্নত করতে পেরেছি। জব প্লেসমেন্ট সাপোর্টও খুবই সাহায্য করেছে।",
//       },
//       {
//         studentName: "মাহমুদুল হাসান",
//         rating: 5,
//         comment:
//           "এই কোর্সটি আমার প্রত্যাশার অনেক উপরে ছিল। ইন্সট্রাক্টররা খুবই জ্ঞানের এবং ধৈর্যশীল। আমি সবাইকে এই কোর্সটি রেকমেন্ড করব।",
//       }
//     ],
//     promoCodes: ["WEBDEV2024", "LEARNWEB", "CODEMASTER" ],
//   },
//   {
//     id: 2,
//     category: "graphicDesign",
//     title: "গ্রাফিক ডিজাইন",
//     duration: 4,
//     totalVideos: 40,
//     price: 4000,
//     link: "/courses/graphic-design",
//     imglink: "/landingPage/courses/graphics.webp",
//   },
//   {
//     id: 3,
//     category: "digitalMarketing",
//     title: "ডিজিটাল মার্কেটিং",
//     duration: 3,
//     totalVideos: 30,
//     price: 3000,
//     link: "/courses/digital-marketing",
//     imglink: "/landingPage/courses/digital_marketing.webp",
//   },
//   {
//     id: 4,
//     category: "videoEditing",
//     title: "ভিডিও এডিটিং",
//     duration: 2,
//     totalVideos: 20,
//     price: 2000,
//     link: "/courses/video-editing",
//     imglink: "/landingPage/courses/video_editing.webp",
//   },
//   {
//     id: 5,
//     category: "itSupport",
//     title: "আইটি সাপোর্ট",
//     duration: 3,
//     totalVideos: 25,
//     price: 3500,
//     link: "/courses/it-support",
//     imglink: "/landingPage/courses/video_editing.webp",
//   },
//   {
//     id: 6,
//     category: "appDevelopment",
//     title: "অ্যাপ ডেভেলপমেন্ট",
//     duration: 5,
//     totalVideos: 45,
//     price: 6000,
//     link: "/courses/app-development",
//     imglink: "/landingPage/courses/video_editing.webp",
//   },
// ];

