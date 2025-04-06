
import { Button } from "@/components/ui/button";

const CountrySpotlight = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Country spotlight</h2>
      <p className="mb-8">
        Not sure where to go next? Get inspired by our changing country spotlight, where we highlight top destinations and what makes them unique. From culture to cuisine, explore the world one amazing place at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-lg h-80">
          <img 
            src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Rio de Janeiro"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Explore Brazil</h3>
          <div className="mb-2 text-gray-600">Adventure, culture, history</div>
          <p className="mb-4">
            Buzzing nocturnal cities, architectural icons, and lush ecosystems. 
            Brazil offers culture and energy as dynamic as it is entrancing.
          </p>
          <div>
            <Button className="bg-flightblue hover:bg-flightblue-700">Explore Brazil</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySpotlight;
