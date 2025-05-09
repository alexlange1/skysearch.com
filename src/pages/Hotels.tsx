
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Hotel, Search, Calendar, Users } from "lucide-react";

const Hotels = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full py-10 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Find your perfect stay</h1>
          <p className="text-lg mb-6">Search hotels and accommodations around the world</p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white border rounded p-2 flex items-center">
                <div className="mr-2">
                  <Hotel className="h-5 w-5 text-gray-500" />
                </div>
                <div className="w-full">
                  <div className="text-xs text-gray-500">Destination</div>
                  <input 
                    className="border-0 p-0 h-6 text-sm focus:ring-0 focus:outline-none" 
                    placeholder="Where are you going?"
                  />
                </div>
              </div>

              <div className="bg-white border rounded p-2 flex items-center">
                <div className="mr-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <div className="w-full">
                  <div className="text-xs text-gray-500">Check-in</div>
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
                  <div className="text-xs text-gray-500">Check-out</div>
                  <input 
                    className="border-0 p-0 h-6 text-sm focus:ring-0 focus:outline-none" 
                    placeholder="Add date"
                  />
                </div>
              </div>

              <div className="bg-white border rounded p-2 flex items-center">
                <div className="mr-2">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <div className="w-full">
                  <div className="text-xs text-gray-500">Guests</div>
                  <input 
                    className="border-0 p-0 h-6 text-sm focus:ring-0 focus:outline-none" 
                    placeholder="Add guests"
                  />
                </div>
              </div>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Search className="h-5 w-5 mr-2" />
              Search Hotels
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              city: "New York",
              image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              properties: "1,254"
            },
            {
              city: "Paris",
              image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              properties: "987"
            },
            {
              city: "Tokyo",
              image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              properties: "1,053"
            },
            {
              city: "Dubai",
              image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              properties: "842"
            }
          ].map((destination) => (
            <div key={destination.city} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={destination.image} 
                  alt={destination.city}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{destination.city}</h3>
                <p className="text-sm text-gray-600 mt-1">{destination.properties} properties</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hotels;
