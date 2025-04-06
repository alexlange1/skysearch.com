
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Plane, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Country image slideshows
const COUNTRY_SLIDESHOWS = {
  Japan: [
    {
      url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Tokyo",
      description: "The bustling capital city blends ultramodern and traditional, from neon-lit skyscrapers to historic temples."
    },
    {
      url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Kyoto",
      description: "Former capital known for its numerous classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses."
    },
    {
      url: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
      title: "Mount Fuji",
      description: "Japan's tallest peak is an active volcano and iconic symbol of the country, attracting hikers and photographers year-round."
    }
  ],
  Italy: [
    {
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Venice",
      description: "Built on more than 100 small islands in a lagoon in the Adriatic Sea, Venice has no roads, just canals lined with Renaissance and Gothic palaces."
    },
    {
      url: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Rome",
      description: "Italy's capital city offers nearly 3,000 years of globally influential art, architecture and culture, including ancient ruins such as the Forum and the Colosseum."
    },
    {
      url: "https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
      title: "Tuscany",
      description: "Known for its landscapes, history, artistic legacy, and influence on high culture, Tuscany is regarded as the birthplace of the Renaissance."
    }
  ],
  Australia: [
    {
      url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Sydney Opera House",
      description: "A multi-venue performing arts center and one of the 20th century's most distinctive buildings, located in Sydney Harbour."
    },
    {
      url: "https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
      title: "Great Barrier Reef",
      description: "The world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers."
    },
    {
      url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Uluru",
      description: "Also known as Ayers Rock, this large sandstone rock formation in the Northern Territory is sacred to indigenous Australians."
    }
  ],
  Morocco: [
    {
      url: "https://images.unsplash.com/photo-1489749798304-4c3bae1law-487?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Marrakech",
      description: "A major economic center and home to mosques, palaces and gardens. The medina is a densely packed, walled medieval city with maze-like alleys."
    },
    {
      url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Sahara Desert",
      description: "Experience the magic of the desert with camel treks, nights under the stars in Berber camps, and the stunning sand dunes of Erg Chebbi."
    },
    {
      url: "https://images.unsplash.com/photo-1549140600-78c9b8275e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Chefchaouen",
      description: "Known as the 'Blue City', this stunning mountain village is famous for its blue-painted buildings and picturesque setting in the Rif Mountains."
    }
  ],
  Thailand: [
    {
      url: "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Bangkok",
      description: "Thailand's capital features ornate shrines, vibrant street life, and a modern cityscape alongside the iconic Chao Phraya River."
    },
    {
      url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
      title: "Phuket",
      description: "Thailand's largest island offers beautiful beaches, lush rainforests, and vibrant nightlife in its popular Patong area."
    },
    {
      url: "https://images.unsplash.com/photo-1557041837-dbc9d576c33c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Chiang Mai",
      description: "A mountainous city in northern Thailand known for its historic temples, vibrant night markets and proximity to lush jungles."
    }
  ],
  Peru: [
    {
      url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Machu Picchu",
      description: "This 15th-century Inca citadel is located in the Eastern Cordillera of southern Peru on a 2,430-meter mountain ridge."
    },
    {
      url: "https://images.unsplash.com/photo-1580619305218-8423a7ef79dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80",
      title: "Lima",
      description: "Peru's capital city combines modern skyscrapers with colonial architecture, is known as the gastronomical capital of the Americas."
    },
    {
      url: "https://images.unsplash.com/photo-1569208623648-36b777f2dbb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Rainbow Mountain",
      description: "Vinicunca, also called Rainbow Mountain, shows off stunning colorful mineral deposits that create a rainbow-like appearance."
    }
  ]
};

const Explore = () => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentCountry, setCurrentCountry] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const openSlideshow = (country) => {
    setCurrentCountry(country);
    setCurrentSlide(0);
    setShowSlideshow(true);
  };

  const nextSlide = () => {
    if (currentCountry && COUNTRY_SLIDESHOWS[currentCountry]) {
      setCurrentSlide((prev) => (prev + 1) % COUNTRY_SLIDESHOWS[currentCountry].length);
    }
  };

  const prevSlide = () => {
    if (currentCountry && COUNTRY_SLIDESHOWS[currentCountry]) {
      setCurrentSlide((prev) => (prev - 1 + COUNTRY_SLIDESHOWS[currentCountry].length) % COUNTRY_SLIDESHOWS[currentCountry].length);
    }
  };

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
              image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                  onClick={() => openSlideshow(destination.name)}
                >
                  <Plane className="h-4 w-4 rotate-45" />
                  Explore {destination.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slideshow Dialog */}
      <Dialog open={showSlideshow} onOpenChange={setShowSlideshow}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {currentCountry && COUNTRY_SLIDESHOWS[currentCountry] && (
            <div className="relative h-[500px] bg-black">
              {/* Close button */}
              <button 
                className="absolute right-4 top-4 z-50 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
                onClick={() => setShowSlideshow(false)}
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
                src={COUNTRY_SLIDESHOWS[currentCountry][currentSlide].url}
                alt={COUNTRY_SLIDESHOWS[currentCountry][currentSlide].title}
                className="w-full h-full object-cover"
              />
              
              {/* Slide info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{COUNTRY_SLIDESHOWS[currentCountry][currentSlide].title}</h3>
                <p className="text-lg">{COUNTRY_SLIDESHOWS[currentCountry][currentSlide].description}</p>
                
                {/* Dots indicator */}
                <div className="flex justify-center space-x-2 mt-4">
                  {COUNTRY_SLIDESHOWS[currentCountry].map((_, index) => (
                    <button 
                      key={index} 
                      className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Explore;
