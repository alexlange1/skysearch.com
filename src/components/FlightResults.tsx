
import React from 'react';
import { Flight } from '@/services/flightService';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FlightResultsProps {
  flights: Flight[];
  isLoading: boolean;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, isLoading }) => {
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!flights.length) {
    return null;
  }

  const handleBookFlight = async (flight: Flight) => {
    // Format departure and arrival times to ISO format required by API
    // For demo purposes, we'll use today's date with the time from the flight
    const formatTimeToISO = (timeString: string): string => {
      const today = new Date().toISOString().split('T')[0];
      const [time, period] = timeString.split(' ');
      const [hourStr, minuteStr] = time.split(':');
      
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      // Convert 12-hour format to 24-hour format
      if (period === 'PM' && hour < 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      
      return `${today}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
    };

    const bookingData = {
      provider: "Travel Agent",
      function: "bookFlight",
      parameters: {
        airline: flight.airline,
        flight_number: flight.flightNumber,
        from: flight.departureAirportCode,
        to: flight.arrivalAirportCode,
        departure_time: formatTimeToISO(flight.departureTime),
        arrival_time: formatTimeToISO(flight.arrivalTime),
        duration: flight.durationInMinutes.toString(),
        stops: flight.stops.toString(),
        price: flight.price.toString(),
        currency: flight.currency || "USD"
      }
    };

    try {
      console.log('Booking flight with data:', bookingData);
      
      // In a real implementation, this would be an API call
      // For now we'll simulate a successful booking
      toast({
        title: "Flight booked successfully!",
        description: `Your ${flight.airline} flight from ${flight.departureAirportCode} to ${flight.arrivalAirportCode} has been booked.`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error booking flight:', error);
      toast({
        title: "Booking failed",
        description: "There was an error booking your flight. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full py-4 bg-white">
      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Airline and Flight Number Section */}
                <div className="bg-blue-50 p-4 md:w-1/4 flex flex-col justify-center items-center">
                  <div className="text-lg font-bold text-center">{flight.airline}</div>
                  <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                  <Badge variant={flight.stops === 0 ? "outline" : "secondary"} className="mt-2">
                    {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                  </Badge>
                </div>
                
                {/* Flight Details Section */}
                <div className="p-6 md:w-2/4 flex flex-col md:flex-row justify-between items-center">
                  {/* Departure Info */}
                  <div className="text-center md:text-left mb-2 md:mb-0">
                    <div className="flex items-center">
                      <Plane className="mr-2 text-blue-500" size={20} />
                      <span className="text-lg font-semibold">{flight.departureTime}</span>
                    </div>
                    <div className="text-sm font-medium">{flight.departureAirportCode}</div>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex flex-col items-center mx-4">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="flex items-center">
                      <Clock className="mr-1 text-gray-400" size={16} />
                      <span className="font-medium">{flight.duration}</span>
                    </div>
                    <div className="w-32 h-0.5 bg-gray-300 relative my-2">
                      {flight.stops === 0 ? (
                        <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      ) : (
                        <>
                          {Array.from({ length: flight.stops }).map((_, idx) => (
                            <div 
                              key={idx}
                              className="w-2 h-2 rounded-full bg-orange-500 absolute top-1/2 transform -translate-y-1/2"
                              style={{ left: `${(idx + 1) * 100 / (flight.stops + 1)}%` }}
                            ></div>
                          ))}
                        </>
                      )}
                    </div>
                    {flight.stops > 0 && (
                      <div className="text-xs text-orange-500 font-semibold">
                        {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  
                  {/* Arrival Info */}
                  <div className="text-center md:text-right mt-2 md:mt-0">
                    <div className="flex items-center justify-end">
                      <span className="text-lg font-semibold">{flight.arrivalTime}</span>
                      <Plane className="ml-2 text-blue-500 transform rotate-90" size={20} />
                    </div>
                    <div className="text-sm font-medium">{flight.arrivalAirportCode}</div>
                  </div>
                </div>
                
                {/* Price and Booking Section */}
                <div className="bg-blue-50 p-6 md:w-1/4 flex flex-col justify-center items-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${flight.price}
                  </div>
                  <button 
                    className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
                    onClick={() => handleBookFlight(flight)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
