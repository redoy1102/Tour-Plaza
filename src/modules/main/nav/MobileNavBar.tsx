import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { navBarMenus } from "@/data/landingPage/navBarData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SubMenu {
  label: string;
  link: string;
}

interface NavItem {
  label: string;
  link?: string;
  subMenus?: SubMenu[];
}

const MobileNavbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      {/* Trigger (Hamburger) */}
      <SheetTrigger asChild>
        <button className="xl:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      {/* Drawer */}
      <SheetContent side="right" className="w-[85%] p-5">
        {/* Menu */}
        <nav className="space-y-4">
          <Accordion type="single" collapsible>
            {navBarMenus.map((item: NavItem, index: number) =>
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
                      {item.subMenus.map((sub: SubMenu, i: number) => (
                        <Link
                          key={i}
                          to={sub.link}
                          className="block text-gray-600"
                          onClick={() => setSheetOpen(false)}
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
                  className="block text-lg font-medium mb-3"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setSheetOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </Accordion>
        </nav>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/book-now"
            onClick={() => {
              window.scrollTo(0, 0);
              setSheetOpen(false);
            }}
          >
            <Button className="w-full rounded-full bg-primary py-6 text-lg">
              Book Now
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
