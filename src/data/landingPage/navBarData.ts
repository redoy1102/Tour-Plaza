export const navBarMenus = [
  // আমাদের কোর্সসমূহ
  {
    label: "কোর্সসমূহ",
    link: "/courses",
    subMenus: [
      { label: "ওয়েব ডেভেলপমেন্ট", link: "/courses?category=webDevelopment" },
      { label: "গ্রাফিক্স ডিজাইন", link: "/courses?category=graphicsDesign" },
      {
        label: "ডিজিটাল মার্কেটিং",
        link: "/courses?category=digitalMarketing",
      },
      { label: "ভিডিও এডিটিং", link: "/courses?category=videoEditing" },
      { label: "আইটি সাপোর্ট", link: "/courses?category=itSupport" },
      { label: "অ্যাপ ডেভেলপমেন্ট", link: "/courses?category=appDevelopment" },
      { label: "3D অ্যানিমেশন", link: "/courses?category=3DAnimation" },
      {
        label: "ডাটা ইঞ্জিনিয়ারিং",
        link: "/courses?category=dataEngineering",
      },
      {
        label: "কৃত্রিম বুদ্ধিমত্তা",
        link: "/courses?category=artificialIntelligence",
      },
    ],
  },
  {
    label: "আমাদের সম্পর্কে",
    link: "/about",
  },
  {
    label: "যোগাযোগ",
    link: "/contact",
  },
  {
    label: "ডাউনলোড",
    subMenus: [
      { label: "Mobile App", link: "/download/mobile-app" },
      { label: "Brochure", link: "/download/brochure" },
      { label: "Course Outline", link: "/download/course-outline" },
    ],
  },
];
