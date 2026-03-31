import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/data/landingPage/contactData";

const Contacts = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        
        // Dynamic branding based on channel
        const isWhatsApp = info.label.toLowerCase().includes('whatsapp');
        
        return (
          <a
            key={index}
            href={info.href}
            className="group relative flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent Gradient */}
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-5">
              {/* Icon Container */}
              <div className={`h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isWhatsApp 
                ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' 
                : 'bg-slate-50 text-primary group-hover:bg-primary group-hover:text-white'
              }`}>
                <Icon size={24} />
              </div>

              <div>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground font-bold mb-1">
                  {info.label}
                </p>
                <p className="text-sm md:text-lg font-serif font-bold text-[#0F172A]">
                  {info.value}
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                {info.actionLabel}
              </span>
              <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-all transform group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Contacts;