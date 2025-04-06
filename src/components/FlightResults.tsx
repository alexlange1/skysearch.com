
import React from 'react';
import { Flight } from '@/services/flightService';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock, Calendar } from "lucide-react";

interface FlightResultsProps {
  flights: Flight[];
  isLoading: boolean;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, isLoading }) => {
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

  return (
    <div className="w-full py-10 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6">Flight Results</h2>
        <div className="space-y-4">
          {flights.map((flight) => (
            <Card key={flight.id} className="overflow-hidden card-hover">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-blue-50 p-4 md:w-1/4 flex flex-col justify-center items-center border-r border-gray-200">
                    <div className="text-lg font-bold text-center">{flight.airline}</div>
                    <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                    <Badge variant="outline" className="mt-2">
                      {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                    </Badge>
                  </div>
                  
                  <div className="p-4 md:w-2/4 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-2 md:mb-0">
                      <div className="flex items-center">
                        <Plane className="mr-2 text-blue-500" size={18} />
                        <span className="text-lg font-semibold">{flight.departureTime}</span>
                      </div>
                      <div className="text-sm text-gray-500">{flight.departureAirport.split(' - ')[0]}</div>
                    </div>
                    
                    <div className="flex flex-col items-center mx-2">
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="flex items-center">
                        <Clock className="mr-1 text-gray-400" size={16} />
                        <span className="font-medium">{flight.duration}</span>
                      </div>
                      <div className="w-24 h-0.5 bg-gray-300 relative my-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                      {flight.stops > 0 && (
                        <div className="text-xs text-orange-500">
                          {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center md:text-right mt-2 md:mt-0">
                      <div className="flex items-center justify-end">
                        <span className="text-lg font-semibold">{flight.arrivalTime}</span>
                        <Plane className="ml-2 text-blue-500 transform rotate-90" size={18} />
                      </div>
                      <div className="text-sm text-gray-500">{flight.arrivalAirport.split(' - ')[0]}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 md:w-1/4 flex flex-col justify-center items-center border-l border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">${flight.price}</div>
                    <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
