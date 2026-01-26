import React from "react";

interface StatsCardProps {
  item: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    value: string;
    label: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ item }) => {
  return (
    <div className="text-center">
      <item.icon className="mx-auto mb-4 h-10 w-10 text-blue-600" />
      <h2 className="text-3xl lg:text-5xl font-bold text-secondary mb-2">{item.value}</h2>
      <h2 className="text-sm lg:text-sm text-gray-600">{item.label}</h2>
    </div>
  );
};

export default StatsCard;
