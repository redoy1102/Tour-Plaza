import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SearchBar from "./SearchBar";
import { navBarMenus } from "@/data/landingPage/navBarData";
import MobileNavbar from "./MobileNavBar";
import { Link, useNavigate } from "react-router-dom";
import { AuthSheet } from "./Auth/AuthSection";

const MainNavbar = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="w-32 md:w-40"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="/logo.webp"
              alt="eManager IT Logo"
              className="w-full"
            />
          </Link>
          <div className="hidden xl:flex">
            <SearchBar />
          </div>
        </div>

        {/* Right: Navigation */}
        <div className="hidden xl:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {navBarMenus.map((navItem, index) => {
                return navItem.subMenus && navItem.subMenus.length > 0 ? (
                  <NavigationMenuItem className="relative" key={index}>
                    <NavigationMenuTrigger
                      className="cursor-pointer"
                      onClick={() => navItem.link && navigate(navItem.link)}
                    >
                      {navItem.label}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid w-40 gap-2 p-4">
                        {navItem.subMenus?.map((item, index) => (
                          <li key={index}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.link || "#"}
                                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                {item.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={navItem.link || "#"}
                        className="px-3 py-2 text-sm"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {navItem.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}

              {/* CTA */}
              {/* <NavigationMenuItem>
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full">
                  এনরোল করুন
                </Button>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <AuthSheet />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex xl:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
