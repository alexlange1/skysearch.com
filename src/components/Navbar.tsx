
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plane, Map, Hotel, Car, MessageCircle } from "lucide-react";

// List of components in the menu
const components: { title: string; href: string; description: string; icon: React.ReactNode }[] = [
  {
    title: "Flights",
    href: "/",
    description: "Find the best flight deals from hundreds of travel sites.",
    icon: <Plane className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Hotels",
    href: "#",
    description: "Book your stay at the perfect place for your travels.",
    icon: <Hotel className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Car Rental",
    href: "#",
    description: "Rent a car at the best prices for your destination.",
    icon: <Car className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Explore",
    href: "#",
    description: "Discover new places and plan your next adventure.",
    icon: <Map className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "AI Chat",
    href: "/ai-chat",
    description: "Talk to our AI travel assistant to plan your journey.",
    icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
  },
];

// Inline component for the navigation menu link
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-10">
            <Plane className="h-6 w-6 text-blue-600 rotate-45 mr-2" />
            <span className="text-xl font-bold text-blue-600">SkySearch</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Travel Options</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={
                          <div className="flex items-center">
                            {component.icon}
                            <span className="ml-2">{component.title}</span>
                          </div>
                        }
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Flights
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/ai-chat" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    AI Chat
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
