import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface HeaderProps {
  isLogin: boolean;
}

const Header = ({isLogin}: HeaderProps) => {
    return (
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-center">
            {isLogin ? "লগইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
          </SheetTitle>
          <SheetDescription className="text-center">
            {isLogin
              ? "আপনার তথ্য দিয়ে লগইন করুন"
              : "নতুন অ্যাকাউন্ট খুলতে নিচের তথ্যগুলো দিন"}
          </SheetDescription>
        </SheetHeader>
    );
};

export default Header;