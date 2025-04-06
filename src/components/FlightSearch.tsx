
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Plane, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("round-trip");
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [departureAirport, setDepartureAirport] = useState("JFK New York JFK Airport");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="w-full py-10 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">Compare and book cheap flights with ease</h1>
        <p className="text-lg mb-6">Discover your next dream destination</p>

        <RadioGroup 
          defaultValue="round-trip" 
          className="flex space-x-6 mb-4"
          onValueChange={setTripType}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="round-trip" id="round-trip" />
            <Label htmlFor="round-trip">Round-trip</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-way" id="one-way" />
            <Label htmlFor="one-way">One-way</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multi-city" id="multi-city" />
            <Label htmlFor="multi-city">Multi-city</Label>
          </div>
        </RadioGroup>

        <div className="flex items-center mb-4">
          <Checkbox 
            id="direct-flights-only" 
            checked={directFlightsOnly}
            onCheckedChange={(checked) => setDirectFlightsOnly(!!checked)}
          />
          <label
            htmlFor="direct-flights-only"
            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Direct flights only
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          {/* From */}
          <div className="bg-white border rounded p-2 flex items-center">
            <div className="mr-2">
              <Plane className="h-5 w-5 text-gray-500" />
            </div>
            <div className="w-full">
              <div className="text-xs text-gray-500">From</div>
              <Input 
                placeholder="City or airport" 
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
                className="border-0 p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" 
              />
            </div>
          </div>

          {/* To */}
          <div className="bg-white border rounded p-2 flex items-center">
            <div className="mr-2">
              <Plane className="h-5 w-5 text-gray-500 transform rotate-90" />
            </div>
            <div className="w-full">
              <div className="text-xs text-gray-500">To</div>
              <Input 
                placeholder="Where to?" 
                value={destinationAirport}
                onChange={(e) => setDestinationAirport(e.target.value)}
                className="border-0 p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" 
              />
            </div>
          </div>

          {/* Depart - Return */}
          <div className="bg-white border rounded p-2 flex items-center">
            <div className="mr-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto w-full justify-start font-normal text-left">
                    <div>
                      <div className="text-xs text-gray-500">Depart - Return</div>
                      <div className="text-sm">
                        {departureDate ? format(departureDate, 'EEE, MMM d') : 'Select date'} 
                        {tripType === "round-trip" && (
                          <>
                            {' - '}
                            {returnDate ? format(returnDate, 'EEE, MMM d') : 'Select date'}
                          </>
                        )}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 flex-col">
                  <Calendar
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    className={cn("p-3 pointer-events-auto")}
                    disabled={(date) => date < new Date()}
                  />
                  {tripType === "round-trip" && (
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      className={cn("p-3 pointer-events-auto")}
                      disabled={(date) => date < (departureDate || new Date())}
                    />
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Passengers */}
          <div className="bg-white border rounded p-2 flex items-center">
            <div className="mr-2">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <div className="w-full">
              <div className="text-xs text-gray-500">Passengers</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto w-full justify-start font-normal text-left">
                    <span className="text-sm">{passengers} {passengers === 1 ? 'adult' : 'adults'}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex justify-between items-center">
                    <span>Adults</span>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 rounded-full p-0"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      >-</Button>
                      <span className="w-8 text-center">{passengers}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 rounded-full p-0"
                        onClick={() => setPassengers(passengers + 1)}
                      >+</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Search Button */}
          <Button className="bg-flightblue hover:bg-flightblue-700 h-16">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
