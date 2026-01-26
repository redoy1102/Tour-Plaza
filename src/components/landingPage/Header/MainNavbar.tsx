import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { navBarMenus } from "@/data/landingPage/navBarData";

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
          <SearchBar />
        </div>

        {/* Right: Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {navBarMenus.map((navItem, index) => {
              return navItem.subMenus && navItem.subMenus.length > 0 ? (
                <NavigationMenuItem className="relative" key={index}>
                  <NavigationMenuTrigger>{navItem.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-40 gap-2 p-4">
                      {navItem.subMenus?.map((item, index) => (
                        <li key={index}>
                          <NavigationMenuLink
                            href={item.link}
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={navItem.link}
                    className="px-3 py-2 text-sm"
                  >
                    {navItem.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}

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
