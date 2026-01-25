import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/landingPage.interface";
import { courses } from "@/data/landingPage/courses";

const MainNavbar = () => {
  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Left: Logo */}
          <div className="">
            <img
              src="/logo.webp"
              alt="eManager IT Logo"
              className="w-full h-15"
            />
          </div>

          {/* Center: Search */}
          <div className="hidden md:block w-55">
            <Input placeholder="খুঁজুন কোর্স" className="rounded-lg" />
          </div>
        </div>

        {/* Right: Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {/* Our Courses (Dropdown) */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger>আমাদের কোর্সসমূহ</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-40 gap-2 p-4">
                  {courses?.map((item: Course, index: number) => (
                    <li key={index}>    
                      <NavigationMenuLink href={item.link} className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                        {item.label}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About */}
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="px-3 py-2 text-sm">
                আমাদের সম্পর্কে
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Contact */}
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact" className="px-3 py-2 text-sm">
                যোগাযোগ
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Download (Dropdown) */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger>ডাউনলোড</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid w-35 gap-2 p-4">
                  {["Mobile App", "Brochure", "Course Outline"].map((item) => (
                    <li key={item}>
                      <NavigationMenuLink className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                        {item}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* CTA */}
            <NavigationMenuItem>
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">
                এনরোল করুন
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default MainNavbar;
