import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

export const quickLinksData = [
  {
    title: "হোম",
    url: "/",
  },
  {
    title: "কোর্সসমূহ",
    url: "/courses",
  },
  {
    title: "আমাদের সম্পর্কে",
    url: "/about",
  },
  {
    title: "যোগাযোগ",
    url: "/contact",
  },
];

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