
import { useState, useEffect } from 'react';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  departureAirport: string;
  arrivalAirport: string;
  departureAirportCode: string;
  arrivalAirportCode: string;
  stops: number;
  durationInMinutes: number;
}

export interface FlightSearchParams {
  departureAirport: string;
  destinationAirport: string;
  departureDate?: Date;
  returnDate?: Date;
  directFlightsOnly: boolean;
  passengers: number;
  tripType: string;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// List of popular airports for autocomplete
export const airports: Airport[] = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
  { code: 'LGA', name: 'LaGuardia Airport', city: 'New York', country: 'USA' },
  { code: 'EWR', name: 'Newark Liberty International Airport', city: 'Newark', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
  { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'USA' },
  { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', country: 'USA' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'USA' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'USA' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'USA' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid', country: 'Spain' },
  { code: 'BCN', name: 'Barcelona–El Prat Airport', city: 'Barcelona', country: 'Spain' },
  { code: 'FCO', name: 'Leonardo da Vinci–Fiumicino Airport', city: 'Rome', country: 'Italy' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'China' },
];

// Format airport for display in dropdown
export const formatAirport = (airport: Airport): string => {
  return `${airport.code} - ${airport.city} (${airport.name})`;
};

// Filter airports based on search query
export const filterAirports = (query: string): Airport[] => {
  const lowerQuery = query.toLowerCase();
  return airports.filter(airport => 
    airport.code.toLowerCase().includes(lowerQuery) ||
    airport.name.toLowerCase().includes(lowerQuery) ||
    airport.city.toLowerCase().includes(lowerQuery) ||
    airport.country.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to format minutes to hours and minutes
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Helper function to format date to ISO
export const formatDateToISO = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Helper function to format time from API (2023-05-15T15:00:00) to 12-hour format (3:00 PM)
export const formatTimeFrom24To12 = (timeString: string): string => {
  const date = new Date(timeString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${formattedMinutes} ${ampm}`;
};

// Extract airport code from the full airport string
export const extractAirportCode = (airportString: string): string => {
  const match = airportString.match(/^([A-Z]{3})/);
  return match ? match[1] : '';
};

// This function searches flights using the Flight MCP API
export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  console.log('Searching flights with params:', params);
  
  // Extract airport codes
  const departureCode = extractAirportCode(params.departureAirport);
  const destinationCode = extractAirportCode(params.destinationAirport);
  
  // Format date for API
  const formattedDate = params.departureDate ? formatDateToISO(params.departureDate) : '';
  
  try {
    // For now we'll use mock data to simulate the API call
    // In a real implementation, we would make an actual API call to the Flight MCP
    
    // Mock API response structure based on Skyscanner format
    const mockResponse = {
      data: {
        data: {
          itineraries: {
            buckets: [
              {
                name: "Best",
                items: [
                  {
                    id: "flight1",
                    price: { amount: 145, currency: "USD" },
                    legs: [{
                      id: "leg1",
                      departure: `2023-05-15T15:55:00`,
                      arrival: `2023-05-15T18:55:00`,
                      duration: "3h 0m",
                      durationInMinutes: 180,
                      origin: { id: departureCode, name: params.departureAirport },
                      destination: { id: destinationCode, name: params.destinationAirport },
                      stopCount: 0,
                      carriers: { marketing: [{ name: "JetBlue" }] },
                      flightNumber: "JE8268"
                    }]
                  }
                ]
              },
              {
                name: "Cheapest",
                items: [
                  {
                    id: "flight2",
                    price: { amount: 150, currency: "USD" },
                    legs: [{
                      id: "leg2",
                      departure: `2023-05-15T08:10:00`,
                      arrival: `2023-05-15T11:02:00`,
                      duration: "2h 52m",
                      durationInMinutes: 172,
                      origin: { id: departureCode, name: params.departureAirport },
                      destination: { id: destinationCode, name: params.destinationAirport },
                      stopCount: 0,
                      carriers: { marketing: [{ name: "Singapore Airlines" }] },
                      flightNumber: "SI9838"
                    }]
                  }
                ]
              },
              {
                name: "Fastest",
                items: [
                  {
                    id: "flight3",
                    price: { amount: 160, currency: "USD" },
                    legs: [{
                      id: "leg3",
                      departure: `2023-05-15T14:20:00`,
                      arrival: `2023-05-15T17:18:00`,
                      duration: "2h 58m",
                      durationInMinutes: 178,
                      origin: { id: departureCode, name: params.departureAirport },
                      destination: { id: destinationCode, name: params.destinationAirport },
                      stopCount: 0,
                      carriers: { marketing: [{ name: "American Airlines" }] },
                      flightNumber: "AM5654"
                    }]
                  },
                  {
                    id: "flight4",
                    price: { amount: 160, currency: "USD" },
                    legs: [{
                      id: "leg4",
                      departure: `2023-05-15T12:10:00`,
                      arrival: `2023-05-15T15:02:00`,
                      duration: "2h 52m",
                      durationInMinutes: 172,
                      origin: { id: departureCode, name: params.departureAirport },
                      destination: { id: destinationCode, name: params.destinationAirport },
                      stopCount: 0,
                      carriers: { marketing: [{ name: "Singapore Airlines" }] },
                      flightNumber: "SI4816"
                    }]
                  }
                ]
              },
              {
                name: "Alternative",
                items: [
                  {
                    id: "flight5",
                    price: { amount: 210, currency: "USD" },
                    legs: [{
                      id: "leg5",
                      departure: `2023-05-15T06:30:00`,
                      arrival: `2023-05-15T13:45:00`,
                      duration: "7h 15m",
                      durationInMinutes: 435,
                      origin: { id: departureCode, name: params.departureAirport },
                      destination: { id: destinationCode, name: params.destinationAirport },
                      stopCount: 1,
                      carriers: { marketing: [{ name: "Delta Airlines" }] },
                      flightNumber: "DL2456"
                    }]
                  }
                ]
              }
            ]
          }
        }
      }
    };

    // Flatten the buckets to get all flight items
    const flightItems = mockResponse.data.data.itineraries.buckets.flatMap(bucket => bucket.items);
    
    // Map the API response to our Flight interface
    const flights = flightItems.map((item, index) => {
      const leg = item.legs[0]; // For one-way flights, there's just one leg
      
      return {
        id: item.id || `flight${index + 1}`,
        airline: leg.carriers.marketing[0].name,
        flightNumber: leg.flightNumber,
        departureTime: formatTimeFrom24To12(leg.departure),
        arrivalTime: formatTimeFrom24To12(leg.arrival),
        duration: leg.duration,
        price: item.price.amount,
        currency: item.price.currency,
        departureAirport: leg.origin.name,
        arrivalAirport: leg.destination.name,
        departureAirportCode: leg.origin.id,
        arrivalAirportCode: leg.destination.id,
        stops: leg.stopCount,
        durationInMinutes: leg.durationInMinutes
      };
    });

    // Filter direct flights if requested
    const filteredFlights = params.directFlightsOnly 
      ? flights.filter(flight => flight.stops === 0) 
      : flights;
    
    return filteredFlights;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

// Custom hook for flight search
export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const searchFlightsAsync = async (params: FlightSearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchFlights(params);
      setFlights(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { flights, loading, error, searchFlightsAsync };
};
