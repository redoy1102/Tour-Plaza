import { Phone, Mail, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";

const TopBar = () => {
  return (
    <div className="px-20 flex items-center justify-between p-2 bg-primary text-white text-sm mb-1">
      {/* Contact details */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <p>+880 1335-138590</p>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <p>emanagerit@gmail.com</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Facebook className="w-4 h-4" />
        <Linkedin className="w-4 h-4" />
        <Youtube className="w-4 h-4" />
        
        <Twitter className="w-4 h-4" />
      </div>
    </div>
  );
};

export default TopBar;
