
import { Separator } from "@/components/ui/separator";
import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Plane className="h-6 w-6 text-flightblue rotate-45 mr-2" />
          <h3 className="text-xl font-bold text-flightblue">Flightly.com</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">About us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">How we work</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Support</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Cancel your flight</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Refund policies</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Safety information</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Destinations</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Flight deals</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Travel guides</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Seasonal offers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Connect with us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Facebook</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-flightblue">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} Flightly.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
