
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Car, Search, MapPin, Calendar } from "lucide-react";

const CarRental = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full py-10 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Rent a car for your journey</h1>
          <p className="text-lg mb-6">Compare prices from top car rental companies</p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white border rounded p-2 flex items-center">
                <div className="mr-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                </div>
                <div className="w-full">
                  <div className="text-xs text-gray-500">Pick-up location</div>
                  <input 
                    className="border-0 p-0 h-6 text-sm focus:ring-0 focus:outline-none" 
                    placeholder="City, airport or address"
                  />
                </div>
              </div>

              <div className="bg-white border rounded p-2 flex items-center">
                <div className="mr-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <div className="w-full">
                  <div className="text-xs text-gray-500">Pick-up date</div>
                  <input 
                    className="border-0 p-0 h-6 text-sm focus:ring-0 focus:outline-none" 
                    placeholder="Add date"
                  />
                </div>
              </div>

              <div className="bg-white border rounded p-2 flex items-center">
                <div className="mr-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <div className="w-full">
                  <div className="text-xs text-gray-500">Drop-off date</div>
                  <input 
                    className="border-0 p-0 h-6 text-sm focus:ring-0 focus:outline-none" 
                    placeholder="Add date"
                  />
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 h-full">
                <Search className="h-5 w-5 mr-2" />
                Search Cars
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Car Types</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Economy", price: "from $25/day" },
            { name: "SUV", price: "from $45/day" },
            { name: "Luxury", price: "from $85/day" },
            { name: "Van", price: "from $65/day" },
          ].map((car) => (
            <div key={car.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <Car className="h-20 w-20 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{car.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarRental;
