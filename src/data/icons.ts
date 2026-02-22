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

export const lucideIcons = [
  "Laptop",
  "Globe",
  "Wifi",
  "BookOpen",
  "Code",
  "Terminal",
  "Server",
  "Smartphone",
];

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
