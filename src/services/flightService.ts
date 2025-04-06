
import { useState, useEffect } from 'react';

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  departureAirport: string;
  arrivalAirport: string;
  stops: number;
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
  { code: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'USA' },
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'USA' },
  { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'USA' },
  { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'USA' },
  { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city: 'Madrid', country: 'Spain' },
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

// This is a mock implementation of the MPC algorithm from the repository
// In a real application, we would import and use the actual implementation
export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  console.log('Searching flights with params:', params);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // If directFlightsOnly is true, only return flights with 0 stops
  const mockFlights: Flight[] = [
    {
      id: '1',
      airline: 'Delta Airlines',
      flightNumber: 'DL1234',
      departureTime: '08:00 AM',
      arrivalTime: '10:30 AM',
      duration: '2h 30m',
      price: 299,
      departureAirport: params.departureAirport,
      arrivalAirport: params.destinationAirport,
      stops: 0
    },
    {
      id: '2',
      airline: 'United Airlines',
      flightNumber: 'UA5678',
      departureTime: '10:15 AM',
      arrivalTime: '12:45 PM',
      duration: '2h 30m',
      price: 325,
      departureAirport: params.departureAirport,
      arrivalAirport: params.destinationAirport,
      stops: 0
    },
    {
      id: '3',
      airline: 'American Airlines',
      flightNumber: 'AA9012',
      departureTime: '12:30 PM',
      arrivalTime: '03:45 PM',
      duration: '3h 15m',
      price: 275,
      departureAirport: params.departureAirport,
      arrivalAirport: params.destinationAirport,
      stops: 1
    },
    {
      id: '4',
      airline: 'JetBlue',
      flightNumber: 'JB3456',
      departureTime: '02:45 PM',
      arrivalTime: '05:00 PM',
      duration: '2h 15m',
      price: 350,
      departureAirport: params.departureAirport,
      arrivalAirport: params.destinationAirport,
      stops: 0
    },
    {
      id: '5',
      airline: 'Southwest',
      flightNumber: 'SW7890',
      departureTime: '04:30 PM',
      arrivalTime: '07:15 PM',
      duration: '2h 45m',
      price: 280,
      departureAirport: params.departureAirport,
      arrivalAirport: params.destinationAirport,
      stops: 1
    }
  ];
  
  // Filter flights based on directFlightsOnly
  return params.directFlightsOnly 
    ? mockFlights.filter(flight => flight.stops === 0) 
    : mockFlights;
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
