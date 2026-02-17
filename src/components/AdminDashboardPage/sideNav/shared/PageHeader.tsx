import { Megaphone } from "lucide-react";

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <Megaphone className="w-8 h-8 text-primary" />
      <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900">
        {children}
      </h1>
    </div>
  );
};

export default PageHeader;
