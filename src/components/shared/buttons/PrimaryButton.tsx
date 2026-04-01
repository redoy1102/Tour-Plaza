import { Button } from "../../ui/button";

interface PrimaryButtonProps {
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  title: string;
  height?: string;
  px?: string;
  py?: string;
  hoverType?: boolean;
  link?: string;
  onClick?: () => void;
}

const PrimaryButton = ({
  size,
  title,
  height,
  px = "10",
  py = "7",
  hoverType = false,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Button
      variant={hoverType ? "outline" : "default"}
      size={size}
      onClick={onClick}
      className={`${hoverType ? "border-primary text-primary hover:bg-primary hover:text-white" : "bg-primary hover:bg-primaryWhiteShade text-white"} ${px ? `px-${px}` : "px-10"} ${py ? `py-${py}` : "py-7"} text-lg rounded-xl shadow-2xl transition-all hover:translate-y-0.5 cursor-pointer ${height ? `h-${height}` : ""}`}
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
