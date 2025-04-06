
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

// Airport distance calculation using the Haversine formula (in km)
const airportDistances: { [key: string]: { [key: string]: number } } = {
  'JFK': {
    'LAX': 3983,
    'SFO': 4152,
    'ORD': 1188,
    'ATL': 1223,
    'DFW': 2126,
    'MIA': 1757,
    'LHR': 5541,
    'CDG': 5834,
    'FRA': 6202,
    'AMS': 5831,
    'BCN': 6164,
  },
  'LAX': {
    'JFK': 3983,
    'SFO': 545,
    'ORD': 2815,
    'ATL': 3125,
    'DFW': 1998,
    'MIA': 3756,
    'LHR': 8780,
    'CDG': 9105,
    'FRA': 9320,
    'AMS': 8978,
    'BCN': 9412,
  },
  'BCN': {
    'JFK': 6164,
    'LAX': 9412,
    'LHR': 1147,
    'CDG': 852,
    'MAD': 506,
    'FRA': 1092,
  },
  // Add more distances as needed based on common routes
};

// Dictionary to store airline-specific time variations (in minutes)
const airlineTimeVariations: { [key: string]: number } = {
  'Delta Airlines': -5,
  'United Airlines': 3,
  'American Airlines': -2,
  'JetBlue': 0,
  'Southwest': 8,
  'British Airways': -7,
  'Lufthansa': -3,
  'Air France': 2,
  'Emirates': -10,
  'Singapore Airlines': -8,
};

// Estimate flight duration based on airport codes
export const estimateFlightDuration = (fromCode: string, toCode: string, airline: string = '', stops: number = 0): string => {
  // Extract airport codes from formatted strings if needed
  const extractCode = (airportString: string): string => {
    const match = airportString.match(/^([A-Z]{3})/);
    return match ? match[1] : airportString.substring(0, 3);
  };
  
  const departureCode = extractCode(fromCode);
  const arrivalCode = extractCode(toCode);
  
  // Check if we have a direct distance entry
  let distance = 0;
  if (airportDistances[departureCode]?.[arrivalCode]) {
    distance = airportDistances[departureCode][arrivalCode];
  } else if (airportDistances[arrivalCode]?.[departureCode]) {
    distance = airportDistances[arrivalCode][departureCode];
  } else {
    // Fallback to a rough estimation based on common airport locations
    // Average commercial flight speed is around 900 km/h
    // This is a very rough estimate and should be replaced with actual data
    const airportMap: { [key: string]: [number, number] } = {
      'JFK': [40.6413, -73.7781], // New York
      'LAX': [33.9416, -118.4085], // Los Angeles
      'SFO': [37.6213, -122.3790], // San Francisco
      'ORD': [41.9742, -87.9073], // Chicago
      'ATL': [33.6407, -84.4277], // Atlanta
      'DFW': [32.8998, -97.0403], // Dallas
      'MIA': [25.7932, -80.2906], // Miami
      'LHR': [51.4700, -0.4543], // London
      'CDG': [49.0097, 2.5479], // Paris
      'FRA': [50.0379, 8.5622], // Frankfurt
      'AMS': [52.3105, 4.7683], // Amsterdam
      'MAD': [40.4983, -3.5676], // Madrid
      'BCN': [41.2974, 2.0833], // Barcelona
      'FCO': [41.8045, 12.2508], // Rome
      'DXB': [25.2532, 55.3657], // Dubai
      'SIN': [1.3644, 103.9915], // Singapore
      'HND': [35.5494, 139.7798], // Tokyo
      'SYD': [-33.9399, 151.1753], // Sydney
      'HKG': [22.3080, 113.9185], // Hong Kong
    };
    
    if (airportMap[departureCode] && airportMap[arrivalCode]) {
      // Haversine formula to calculate distance
      const toRadians = (degrees: number) => degrees * Math.PI / 180;
      const [lat1, lon1] = airportMap[departureCode];
      const [lat2, lon2] = airportMap[arrivalCode];
      
      const R = 6371; // Earth radius in km
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      distance = R * c;
    } else {
      // Default to a medium-haul flight if we can't estimate
      distance = 2000;
    }
  }
  
  // Calculate hours and minutes
  // Using average speed of 800 km/h plus 30 minutes for takeoff and landing
  const flightTimeHours = distance / 800;
  const baseHours = Math.floor(flightTimeHours);
  const baseMinutes = Math.round((flightTimeHours - baseHours) * 60);
  
  // Add 30 minutes for takeoff and landing
  let totalMinutes = baseHours * 60 + baseMinutes + 30;
  
  // Apply airline-specific variation if available
  if (airline && airlineTimeVariations[airline]) {
    totalMinutes += airlineTimeVariations[airline];
  }
  
  // For flights with stops, add more time
  if (stops > 0) {
    // Each stop adds a percentage to the total flight time (layover + additional takeoff/landing)
    totalMinutes = Math.round(totalMinutes * (1 + stops * 0.6));
  }
  
  const finalHours = Math.floor(totalMinutes / 60);
  const finalMinutes = totalMinutes % 60;
  
  return `${finalHours}h ${finalMinutes}m`;
};

// Generate a random flight number
const generateFlightNumber = (airline: string): string => {
  const prefix = airline.substring(0, 2).toUpperCase();
  const number = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${number}`;
};

// Generate realistic flight times
const generateFlightTimes = (
  duration: string, 
  date: Date | undefined = undefined
): { departureTime: string, arrivalTime: string } => {
  // Parse duration to minutes
  const durationMatch = duration.match(/(\d+)h\s+(\d+)m/);
  if (!durationMatch) return { departureTime: "09:00 AM", arrivalTime: "11:00 AM" };
  
  const durationHours = parseInt(durationMatch[1], 10);
  const durationMinutes = parseInt(durationMatch[2], 10);
  const totalMinutes = durationHours * 60 + durationMinutes;
  
  // Generate departure time
  let departureHour, departureMinute;
  if (date) {
    // Use the provided date with a reasonable hour
    departureHour = 7 + Math.floor(Math.random() * 12); // Between 7am and 7pm
    departureMinute = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ..., 55
  } else {
    departureHour = 7 + Math.floor(Math.random() * 12); // Between 7am and 7pm
    departureMinute = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ..., 55
  }
  
  // Calculate arrival time
  let arrivalMinutes = departureHour * 60 + departureMinute + totalMinutes;
  let arrivalHour = Math.floor(arrivalMinutes / 60) % 24;
  let arrivalMinute = arrivalMinutes % 60;
  
  // Format the times
  const formatTime = (hours: number, minutes: number) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  return {
    departureTime: formatTime(departureHour, departureMinute),
    arrivalTime: formatTime(arrivalHour, arrivalMinute)
  };
};

// Generate flight based on search parameters
const generateFlight = (params: FlightSearchParams, index: number): Flight => {
  // Extract airport codes for estimating duration
  const departureCode = params.departureAirport.substring(0, 3);
  const arrivalCode = params.destinationAirport.substring(0, 3);
  
  // Generate airlines based on routes
  const airlines = [
    'Delta Airlines',
    'United Airlines',
    'American Airlines',
    'JetBlue',
    'Southwest',
    'British Airways',
    'Lufthansa',
    'Air France',
    'Emirates',
    'Singapore Airlines'
  ];
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  
  // Generate stops - more likely to have stops on longer flights
  const isLongHaul = departureCode && arrivalCode && 
    ((airportDistances[departureCode]?.[arrivalCode] || 0) > 3000 || 
     (airportDistances[arrivalCode]?.[departureCode] || 0) > 3000);
     
  const stops = isLongHaul ? 
    (Math.random() > 0.3 ? 1 : 0) : 
    (Math.random() > 0.7 ? 1 : 0);
    
  // Estimate flight duration (now considers airline variations and stops)
  const duration = estimateFlightDuration(departureCode, arrivalCode, airline, stops);
  
  // Generate flight times based on duration and departure date
  const { departureTime, arrivalTime } = generateFlightTimes(duration, params.departureDate);
  
  // Generate realistic price based on distance and randomness
  const basePrice = 150;
  const distanceFactor = duration.includes('5h') ? 2 : 
                         duration.includes('8h') ? 3 : 
                         duration.includes('12h') ? 4 : 1;
  const seasonalFactor = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
  const price = Math.round((basePrice * distanceFactor * seasonalFactor) / 5) * 5;
  
  return {
    id: `${index + 1}`,
    airline,
    flightNumber: generateFlightNumber(airline),
    departureTime,
    arrivalTime,
    duration,
    price,
    departureAirport: params.departureAirport,
    arrivalAirport: params.destinationAirport,
    stops
  };
};

// This now implements the requested MPC API function pattern
export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  console.log('Searching flights with params:', params);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate between 3 and 7 flights based on the search parameters
  const numFlights = 3 + Math.floor(Math.random() * 5);
  const flights: Flight[] = [];
  
  for (let i = 0; i < numFlights; i++) {
    flights.push(generateFlight(params, i));
  }
  
  // Sort flights - direct flights first, then by price
  flights.sort((a, b) => {
    if (a.stops !== b.stops) return a.stops - b.stops;
    return a.price - b.price;
  });
  
  // If directFlightsOnly is true, only return flights with 0 stops
  return params.directFlightsOnly 
    ? flights.filter(flight => flight.stops === 0) 
    : flights;
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
