import AboutSection from "../landingPage/About Section/AboutSection";

const HeaderAbout = () => {
    return (
        <AboutSection 
        beforeColorText="বাংলাদেশের সবচেয়ে বড়"
        colorText="স্কিল ডেভেলপমেন্ট"
        afterColorText="প্ল্যাটফর্ম"
        description={
          <>
            স্কিল ডেভেলপমেন্টের জন্য বাংলাদেশের সর্বপ্রথম লাইভ-স্ট্রিমিং, ইন্টারেকটিভ এডুকেশন প্ল্যাটফর্ম। আমরা শুধুমাত্র স্কিল্ড হতেই হেল্প করি না, জব পেতেও হেল্প করি।
          </>
        }
        imgSrc="/public/aboutPage/AboutBanner.jpg"
        imgAlt="Banner Image"
        primaryBtn={false}
        secondaryBtn={false}
      />
    );
};

export default HeaderAbout;