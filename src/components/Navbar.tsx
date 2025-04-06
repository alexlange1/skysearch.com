
import { Button } from "@/components/ui/button";
import { HelpCircle, Plane, Building2, Car, Compass, MapPin } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-flightblue w-full">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold flex items-center">
            <Plane className="mr-2 h-6 w-6 rotate-45" />
            Flightly.com
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="text-white bg-transparent border-transparent hover:bg-flightblue-600">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
            <Button variant="outline" className="bg-white text-flightblue hover:bg-gray-100">
              Register
            </Button>
            <Button className="bg-white text-flightblue hover:bg-gray-100">
              Sign in
            </Button>
          </div>
        </div>
        <div className="flex mt-4 space-x-4 overflow-x-auto pb-2">
          <Button
            variant="outline"
            className="bg-transparent text-white border-white border rounded-full hover:bg-flightblue-600"
          >
            <Building2 className="mr-2 h-4 w-4" />
            Stays
          </Button>
          <Button
            variant="outline"
            className="bg-white text-flightblue border-white border rounded-full hover:bg-gray-100"
          >
            <Plane className="mr-2 h-4 w-4" />
            Flights
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white border rounded-full hover:bg-flightblue-600"
          >
            <Building2 className="mr-2 h-4 w-4" />
            <Plane className="mr-2 h-4 w-4" />
            Flight + Hotel
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white border rounded-full hover:bg-flightblue-600"
          >
            <Car className="mr-2 h-4 w-4" />
            Car rentals
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white border rounded-full hover:bg-flightblue-600"
          >
            <Compass className="mr-2 h-4 w-4" />
            Attractions
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-white border rounded-full hover:bg-flightblue-600"
          >
            <Car className="mr-2 h-4 w-4" />
            Airport taxis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
