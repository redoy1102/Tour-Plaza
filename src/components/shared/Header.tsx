interface CourseHeaderProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  normalText?: string;
  colorText?: string;
  description?: string;
}

const Header = ({
  icon,
  normalText,
  colorText,
  description,
}: CourseHeaderProps) => {
  const IconComponent = icon;
  return (
    <div className="mb-8 text-center">
      <div className="mb-2 flex items-center justify-center gap-2">
        {IconComponent && (
          <IconComponent className="h-10 w-10 text-secondary" />
        )}
        <h2 className="text-xl md:text-3xl font-bold">
          {normalText} <span className="text-primary">{colorText}</span>
        </h2>
      </div>
      <p className="mx-auto max-w-2xl text-xs md:text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default Header;
