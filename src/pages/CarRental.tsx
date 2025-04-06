
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
            { name: "Economy", model: "Fiat Tipo", price: "from $25/day", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            { name: "SUV", model: "BMW X5", price: "from $45/day", image: "/lovable-uploads/fef1283b-13f7-4552-9d06-a83e597f0b41.png" },
            { name: "Luxury", model: "Porsche 911", price: "from $85/day", image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
            { name: "Van", model: "Mercedes V Class", price: "from $65/day", image: "/lovable-uploads/7a8f38c7-47d7-42aa-babb-7d63a1f8ba95.png" },
          ].map((car) => (
            <div key={car.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{car.name} - {car.model}</h3>
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
