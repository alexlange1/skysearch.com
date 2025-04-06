
import { Card, CardContent } from "@/components/ui/card";

const destinations = [
  {
    name: "New York",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "$199",
  },
  {
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "$249",
  },
  {
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "$229",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    price: "$499",
  },
];

const PopularDestinations = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-40 relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.country}</p>
                <p className="text-sm font-bold mt-2">From {destination.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
