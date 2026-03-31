import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
// import SearchBar from "./SearchBar";
import { navBarMenus } from "@/data/landingPage/navBarData";
import MobileNavbar from "./MobileNavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthSheet } from "./Auth/AuthSection";

interface SubMenu {
  label: string;
  link: string;
}

interface NavItem {
  label: string;
  link?: string;
  subMenus?: SubMenu[];
}

const MainNavbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Switch state once the hero section (100vh) has scrolled past
      setScrolled(window.scrollY > window.innerHeight - 80);
    };
    // Set correct state immediately when route changes
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Only go transparent on the home page before the hero leaves the viewport
  const isHeroPage = pathname === "/";
  const isTransparent = isHeroPage && !scrolled;

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent shadow-none"
          : "bg-background/90 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="/tourPlazaLogo.webp"
              alt="Tour Plaza Logo"
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right: Navigation */}
        <div className="hidden xl:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {(navBarMenus as NavItem[]).map((navItem, index) => {
                return navItem.subMenus && navItem.subMenus.length > 0 ? (
                  <NavigationMenuItem className="relative" key={index}>
                    <NavigationMenuTrigger
                      className={`cursor-pointer bg-transparent hover:bg-white/10 ${
                        isTransparent &&
                        "text-white hover:text-white focus:text-white data-[state=open]:text-white"
                      }`}
                      onClick={() => navItem.link && navigate(navItem.link)}
                    >
                      {navItem.label}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid w-40 gap-2 p-4">
                        {navItem.subMenus.map((item, index) => (
                          <li key={index}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.link || "#"}
                                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                {item?.label}
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
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          isTransparent && "text-white hover:text-slate-200"
                        }`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        {navItem.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
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
