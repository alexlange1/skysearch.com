
import { Separator } from "@/components/ui/separator";
import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Plane className="h-6 w-6 text-blue-600 rotate-45 mr-2" />
          <h3 className="text-xl font-bold text-blue-600">SkySearch.com</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">About us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">How we work</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Support</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Cancel your flight</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Refund policies</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Safety information</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Discover</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Destinations</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Flight deals</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Travel guides</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Seasonal offers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Connect with us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Facebook</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Instagram</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} SkySearch.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
