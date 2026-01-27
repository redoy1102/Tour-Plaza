import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import { navBarMenus } from "@/data/landingPage/navBarData";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <Sheet>
      {/* Trigger (Hamburger) */}
      <SheetTrigger asChild>
        <button className="xl:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      {/* Drawer */}
      <SheetContent side="right" className="w-[85%] p-5">
        {/* Search */}
        <div className="mb-1 mt-10">
          <SearchBar />
        </div>

        {/* Menu */}
        <nav className="space-y-4">
          <Accordion type="single" collapsible>
            {navBarMenus.map((item, index) =>
              item.subMenus && item.subMenus.length > 0 ? (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b-0"
                >
                  <AccordionTrigger className="text-lg font-medium">
                    {item.label}
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="space-y-2 pl-4">
                      {item.subMenus.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.link}
                          className="block text-gray-600"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  key={index}
                  to={item.link || "#"}
                  className="block text-lg font-medium"
                >
                  {item.label}
                </Link>
              )
            )}
          </Accordion>
        </nav>

        {/* CTA */}
        <div className="mt-10">
          <Button className="w-full rounded-full bg-primary py-6 text-lg">
            এনরোল করুন
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
