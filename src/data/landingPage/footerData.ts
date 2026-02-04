import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";
import { navBarMenus } from "./navBarData";

export const quickLinksData = navBarMenus.map((item) => {
  if (item.label === "আমাদের সম্পর্কে" || item.label === "যোগাযোগ") {
    return item;
  } else if (item.label === "কোর্সসমূহ") {
    return { label: "সব কোর্স", link: "/courses" };
  }
});

export const contactData = [
  {
    icon: MapPin,
    text: "House:- 06, Road:- 2/B, Block:- J, Baridhara, Dhaka-1212",
  },
  {
    icon: Phone,
    text: "+880 1335-138590",
  },
  {
    icon: Mail,
    text: "emanagerit@gmail.com",
  },
];

export const socialIconsData = [
  {
    icon: FaFacebookF,
    url: "https://facebook.com",
  },
  {
    icon: FaLinkedinIn,
    url: "https://linkedin.com",
  },
  {
    icon: FaYoutube,
    url: "https://youtube.com",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com",
  },
];
