
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const Explore = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full py-10 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Explore the world</h1>
          <p className="text-lg mb-6">Discover amazing destinations and experiences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              name: "Japan", 
              image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              description: "Experience ancient traditions alongside cutting-edge technology in the land of the rising sun." 
            },
            { 
              name: "Italy", 
              image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              description: "From historic Rome to the canals of Venice, discover art, cuisine and stunning landscapes." 
            },
            { 
              name: "Australia", 
              image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              description: "Explore vibrant cities, pristine beaches, and the unique wildlife of the outback." 
            },
            { 
              name: "Morocco", 
              image: "https://images.unsplash.com/photo-1489749798304-4c3bae1law-787?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              description: "Wander through ancient medinas, savor exotic flavors, and experience desert adventures." 
            },
            { 
              name: "Thailand", 
              image: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              description: "Discover tropical beaches, ornate temples, and vibrant street life in the Land of Smiles." 
            },
            { 
              name: "Peru", 
              image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
              description: "Trek to Machu Picchu, explore the Amazon, and experience rich indigenous cultures." 
            },
          ].map((destination) => (
            <div key={destination.name} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] duration-300">
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/2 flex items-end p-4">
                  <div className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="font-bold text-xl">{destination.name}</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="mb-4 text-gray-600">{destination.description}</p>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Plane className="h-4 w-4 rotate-45" />
                  Explore {destination.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;
