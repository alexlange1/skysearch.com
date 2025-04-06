
import { Button } from "@/components/ui/button";
import { MapPin, Plane } from "lucide-react";

const CountrySpotlight = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-6">
        <div className="h-10 w-1 bg-flightblue rounded mr-3"></div>
        <h2 className="text-3xl font-bold">Country spotlight</h2>
      </div>
      <p className="mb-8 text-gray-600 max-w-3xl">
        Not sure where to go next? Get inspired by our changing country spotlight, where we highlight top destinations and what makes them unique. From culture to cuisine, explore the world one amazing place at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden shadow-lg">
        <div className="relative overflow-hidden h-96">
          <img 
            src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Rio de Janeiro"
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-1/3 flex items-end p-4">
            <div className="flex items-center text-white">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="font-medium">Rio de Janeiro, Brazil</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <h3 className="text-3xl font-bold mb-3 text-flightblue">Explore Brazil</h3>
          <div className="flex items-center mb-4">
            <span className="bg-flightblue/10 text-flightblue px-3 py-1 rounded-full text-sm font-medium mr-2">Adventure</span>
            <span className="bg-flightblue/10 text-flightblue px-3 py-1 rounded-full text-sm font-medium mr-2">Culture</span>
            <span className="bg-flightblue/10 text-flightblue px-3 py-1 rounded-full text-sm font-medium">History</span>
          </div>
          <p className="mb-6 text-gray-700">
            Buzzing nocturnal cities, architectural icons, and lush ecosystems. 
            Brazil offers culture and energy as dynamic as it is entrancing.
            From the Amazon rainforest to the beaches of Rio, discover a country 
            of incredible diversity and vibrant experiences.
          </p>
          <div>
            <Button className="bg-flightblue hover:bg-flightblue-700 gap-2">
              <Plane className="h-4 w-4 rotate-45" />
              Explore Brazil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySpotlight;
