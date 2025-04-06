
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Plane, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const BRAZIL_SLIDESHOW_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Rio de Janeiro",
    description: "Discover the vibrant city with its iconic Christ the Redeemer statue and beautiful beaches like Copacabana and Ipanema."
  },
  {
    url: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    title: "Amazon Rainforest",
    description: "Explore the world's largest tropical rainforest, home to the greatest variety of plants and animals on Earth."
  },
  {
    url: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Salvador",
    description: "Experience the birthplace of Brazilian culture with colorful colonial architecture, vibrant music, and delicious cuisine."
  },
  {
    url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "Iguazu Falls",
    description: "Witness one of the world's most spectacular waterfalls, spanning the border between Brazil and Argentina."
  }
];

const CountrySpotlight = () => {
  const [showBrazilSlideshow, setShowBrazilSlideshow] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BRAZIL_SLIDESHOW_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BRAZIL_SLIDESHOW_IMAGES.length) % BRAZIL_SLIDESHOW_IMAGES.length);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-6">
        <div className="h-10 w-1 bg-blue-600 rounded mr-3"></div>
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
          <h3 className="text-3xl font-bold mb-3 text-blue-600">Explore Brazil</h3>
          <div className="flex items-center mb-4">
            <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-2">Adventure</span>
            <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-2">Culture</span>
            <span className="bg-blue-600/10 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">History</span>
          </div>
          <p className="mb-6 text-gray-700">
            Buzzing nocturnal cities, architectural icons, and lush ecosystems. 
            Brazil offers culture and energy as dynamic as it is entrancing.
            From the Amazon rainforest to the beaches of Rio, discover a country 
            of incredible diversity and vibrant experiences.
          </p>
          <div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 gap-2"
              onClick={() => setShowBrazilSlideshow(true)}
            >
              <Plane className="h-4 w-4 rotate-45" />
              Explore Brazil
            </Button>
          </div>
        </div>
      </div>

      {/* Brazil Slideshow Dialog */}
      <Dialog open={showBrazilSlideshow} onOpenChange={setShowBrazilSlideshow}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative h-[500px] bg-black">
            {/* Close button */}
            <button 
              className="absolute right-4 top-4 z-50 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
              onClick={() => setShowBrazilSlideshow(false)}
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Navigation arrows */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
              onClick={nextSlide}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            {/* Slide image */}
            <img 
              src={BRAZIL_SLIDESHOW_IMAGES[currentSlide].url}
              alt={BRAZIL_SLIDESHOW_IMAGES[currentSlide].title}
              className="w-full h-full object-cover"
            />
            
            {/* Slide info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{BRAZIL_SLIDESHOW_IMAGES[currentSlide].title}</h3>
              <p className="text-lg">{BRAZIL_SLIDESHOW_IMAGES[currentSlide].description}</p>
              
              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {BRAZIL_SLIDESHOW_IMAGES.map((_, index) => (
                  <button 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CountrySpotlight;
