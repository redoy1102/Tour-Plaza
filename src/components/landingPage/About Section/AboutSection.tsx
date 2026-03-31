import AboutContent from "./AboutContent";
import AboutImage from "./AboutImage";
import React from "react";

interface AboutSectionProps {
  beforeColorText?: string;
  colorText?: string;
  afterColorText?: string;
  description?: React.ReactNode;
  imgSrc?: string;
  imgAlt?: string;
  primaryBtn?: boolean;
  secondaryBtn?: boolean;
  bgColor?: boolean;
}

const AboutSection = ({
  beforeColorText,
  colorText,
  afterColorText,
  description,
  imgSrc,
  imgAlt,
  primaryBtn,
  secondaryBtn,
  bgColor = false,
}: AboutSectionProps) => {
  return (
    <div
      className={`${bgColor && "bg-linear-to-r from-[#eef3f8] via-white to-[#fdecef]"}`}
    >
      <div className="container mx-auto px-4 md:px-12 xl:px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AboutContent
            beforeColorText={beforeColorText}
            colorText={colorText}
            afterColorText={afterColorText}
            description={description}
            primaryBtn={primaryBtn}
            secondaryBtn={secondaryBtn}
          />
          <AboutImage imgSrc={imgSrc} imgAlt={imgAlt} />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
