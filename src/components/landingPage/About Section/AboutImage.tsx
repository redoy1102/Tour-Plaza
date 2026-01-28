interface AboutImageProps {
  imgSrc?: string;
  imgAlt?: string;
}

const AboutImage = ({ imgSrc, imgAlt }: AboutImageProps) => {
  return (
    <div>
      <img src={imgSrc} alt={imgAlt} className="rounded-2xl" />
    </div>
  );
};

export default AboutImage;
