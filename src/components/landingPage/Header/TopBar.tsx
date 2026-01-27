import {
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-primary text-white text-sm">
      <div className="container mx-auto px-4 md:px-12 xl:px-4 p-2 mb-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-center">
          {/* Contact details */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <p>01335-138590</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <p>emanagerit@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-2">
            <Facebook className="w-4 h-4" />
            <Linkedin className="w-4 h-4" />
            <Youtube className="w-4 h-4" />
            <Twitter className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
