
import { Flight } from "./flightService";

// Interface for city to airport ID response
interface AutoCompleteResult {
  skyId: string;
  entityId: string;
  name: string;
}

interface FlightLeg {
  departure: string;
  arrival: string;
  durationInMinutes: number;
  stopCount: number;
  origin: {
    id: string;
    name: string;
  };
  destination: {
    id: string;
    name: string;
  };
  carriers: {
    marketing: Array<{name: string}>;
  };
  flightNumber: string;
}

interface FlightItem {
  price: {
    amount: number;
    currency: string;
  };
  legs: FlightLeg[];
  id: string;
}

interface FlightBucket {
  name: string;
  items: FlightItem[];
}

interface FlightSearchResponse {
  data: {
    data: {
      itineraries: {
        buckets: FlightBucket[];
      };
    };
  };
}

// Formats a date object to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Formats time from ISO to 12-hour format (3:00 PM)
const formatTimeFrom24To12 = (timeString: string): string => {
  const date = new Date(timeString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${formattedMinutes} ${ampm}`;
};

// Formats duration in minutes to human-readable format
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Extract flight details from query using NLP
const extractFlightDetails = (query: string): { origin: string; destination: string; date?: Date } => {
  // This is a simple implementation - in real-world, use more sophisticated NLP
  const originMatches = query.match(/from\s+([A-Za-z\s]+?)(?:\s+to|\s+on|$)/i);
  const destinationMatches = query.match(/to\s+([A-Za-z\s]+?)(?:\s+on|$)/i);
  
  // Extract dates - very simple implementation
  const dateMatches = query.match(/on\s+([\w\s,]+)(?:$|\s+|\.)/i);
  
  let date: Date | undefined = undefined;
  if (dateMatches && dateMatches[1]) {
    const dateParsed = new Date(dateMatches[1]);
    if (!isNaN(dateParsed.getTime())) {
      date = dateParsed;
    } else {
      // Default to tomorrow if date parsing fails
      date = new Date();
      date.setDate(date.getDate() + 1);
    }
  } else {
    // Default to tomorrow
    date = new Date();
    date.setDate(date.getDate() + 1);
  }
  
  return {
    origin: originMatches?.[1]?.trim() || "New York",
    destination: destinationMatches?.[1]?.trim() || "London",
    date
  };
};

// Search flights using the MCP
export const mcpFlightSearch = async (query: string): Promise<{ flights: Flight[]; responseMessage: string }> => {
  try {
    const { origin, destination, date } = extractFlightDetails(query);
    
    console.log(`Searching for flights from ${origin} to ${destination}`);
    
    // Step 1: Get airport IDs using flightsAutoComplete
    const originIds = await flightsAutoComplete(origin);
    const destinationIds = await flightsAutoComplete(destination);
    
    if (!originIds.length || !destinationIds.length) {
      return { 
        flights: [],
        responseMessage: `I couldn't find airports for ${!originIds.length ? origin : ''} ${!destinationIds.length ? destination : ''}. Please try different city names.`
      };
    }
    
    // Step 2: Use the first result for each
    const originData = originIds[0];
    const destinationData = destinationIds[0];
    
    // Step 3: Search for flights
    const searchDate = date ? formatDate(date) : formatDate(new Date());
    
    // For demo, we'll use mock data that mimics the structure from the Skyscanner API
    // In a real implementation, you would use flightsOneWay from the MCP
    const mockFlightResponse: FlightSearchResponse = {
      data: {
        data: {
          itineraries: {
            buckets: [
              {
                name: "Best",
                items: [
                  {
                    id: "flight1",
                    price: { amount: 165, currency: "USD" },
                    legs: [{
                      id: "leg1",
                      departure: `2025-04-06T16:05:00`,
                      arrival: `2025-04-06T20:07:00`,
                      duration: "4h 2m",
                      durationInMinutes: 242,
                      origin: { id: originData.skyId, name: origin },
                      destination: { id: destinationData.skyId, name: destination },
                      stopCount: 0,
                      carriers: { marketing: [{ name: "Emirates" }] },
                      flightNumber: "EM2619"
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
                      departure: `2025-04-06T10:20:00`,
                      arrival: `2025-04-06T14:35:00`,
                      duration: "4h 15m",
                      durationInMinutes: 255,
                      origin: { id: originData.skyId, name: origin },
                      destination: { id: destinationData.skyId, name: destination },
                      stopCount: 0,
                      carriers: { marketing: [{ name: "American Airlines" }] },
                      flightNumber: "AA4580"
                    }]
                  }
                ]
              },
              {
                name: "Alternative",
                items: [
                  {
                    id: "flight3",
                    price: { amount: 180, currency: "USD" },
                    legs: [{
                      id: "leg3",
                      departure: `2025-04-06T07:15:00`,
                      arrival: `2025-04-06T13:42:00`,
                      duration: "6h 27m",
                      durationInMinutes: 387,
                      origin: { id: originData.skyId, name: origin },
                      destination: { id: destinationData.skyId, name: destination },
                      stopCount: 1,
                      carriers: { marketing: [{ name: "Emirates" }] },
                      flightNumber: "EM7606"
                    }]
                  }
                ]
              }
            ]
          }
        }
      }
    };

    // Extract flights from all buckets
    const flightItems = mockFlightResponse.data.data.itineraries.buckets.flatMap(bucket => bucket.items);
    
    // Map to our Flight interface
    const flights: Flight[] = flightItems.map((item, index) => {
      const leg = item.legs[0];
      
      return {
        id: item.id,
        airline: leg.carriers.marketing[0].name,
        flightNumber: leg.flightNumber,
        departureTime: formatTimeFrom24To12(leg.departure),
        arrivalTime: formatTimeFrom24To12(leg.arrival),
        duration: formatDuration(leg.durationInMinutes),
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

    // Prepare response message
    const dateStr = date ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'tomorrow';
    
    let responseMessage = `I found ${flights.length} flights from ${originData.name} to ${destinationData.name} on ${dateStr}. `;
    
    if (flights.length > 0) {
      const cheapestFlight = flights.reduce((prev, curr) => prev.price < curr.price ? prev : curr);
      const directFlights = flights.filter(f => f.stops === 0);
      
      responseMessage += `The cheapest option is $${cheapestFlight.price} with ${cheapestFlight.airline}. `;
      
      if (directFlights.length > 0) {
        responseMessage += `There ${directFlights.length === 1 ? 'is' : 'are'} ${directFlights.length} direct flight${directFlights.length !== 1 ? 's' : ''} available. `;
      }
      
      responseMessage += "Here are the available options:";
    }

    return { flights, responseMessage };
    
  } catch (error) {
    console.error("Error in mcpFlightSearch:", error);
    return { 
      flights: [], 
      responseMessage: "I'm sorry, I couldn't search for flights at the moment. Please try again later."
    };
  }
};

// Helper for auto-completing city names to airport IDs
const flightsAutoComplete = async (query: string): Promise<AutoCompleteResult[]> => {
  // In a real implementation, this would call the MCP endpoint
  // For demo, we'll return mock data
  const mockResults: Record<string, AutoCompleteResult[]> = {
    "new york": [
      { skyId: "JFK", entityId: "27544008", name: "New York John F. Kennedy" },
      { skyId: "LGA", entityId: "27545305", name: "New York LaGuardia" }
    ],
    "london": [
      { skyId: "LHR", entityId: "27543456", name: "London Heathrow" },
      { skyId: "LGW", entityId: "27544056", name: "London Gatwick" }
    ],
    "paris": [
      { skyId: "CDG", entityId: "27543404", name: "Paris Charles de Gaulle" },
      { skyId: "ORY", entityId: "27544022", name: "Paris Orly" }
    ],
    "chicago": [
      { skyId: "ORD", entityId: "27539734", name: "Chicago O'Hare" }
    ],
    "san francisco": [
      { skyId: "SFO", entityId: "27542331", name: "San Francisco International" }
    ]
    // Add more cities as needed
  };
  
  // Find a match in our mock data
  const lowerQuery = query.toLowerCase();
  for (const [city, results] of Object.entries(mockResults)) {
    if (lowerQuery.includes(city)) {
      return results;
    }
  }
  
  // If we don't have mock data for this city, return a generic result based on the query
  return [
    { 
      skyId: query.substring(0, 3).toUpperCase(), 
      entityId: "27540000", 
      name: query.charAt(0).toUpperCase() + query.slice(1) + " Airport"
    }
  ];
};

// Update the App.tsx to add a link to the AI Chat
