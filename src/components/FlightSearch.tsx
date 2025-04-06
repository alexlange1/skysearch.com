
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Plane, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useFlightSearch, FlightSearchParams, Airport, airports, filterAirports, formatAirport } from "@/services/flightService";
import FlightResults from "./FlightResults";
import { useToast } from "@/hooks/use-toast";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("round-trip");
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [dateSelectionMode, setDateSelectionMode] = useState<"departure" | "return">("departure");
  
  const [departureSearchQuery, setDepartureSearchQuery] = useState("");
  const [destinationSearchQuery, setDestinationSearchQuery] = useState("");
  const [filteredDepartureAirports, setFilteredDepartureAirports] = useState<Airport[]>(airports);
  const [filteredDestinationAirports, setFilteredDestinationAirports] = useState<Airport[]>(airports);
  
  const [departurePopoverOpen, setDeparturePopoverOpen] = useState(false);
  const [destinationPopoverOpen, setDestinationPopoverOpen] = useState(false);
  
  const { flights, loading, error, searchFlightsAsync } = useFlightSearch();
  const { toast } = useToast();
  
  // Filter airports based on search input
  useEffect(() => {
    setFilteredDepartureAirports(filterAirports(departureSearchQuery));
  }, [departureSearchQuery]);
  
  useEffect(() => {
    setFilteredDestinationAirports(filterAirports(destinationSearchQuery));
  }, [destinationSearchQuery]);

  const handleDepartureSelect = (airportCode: string) => {
    const selected = airports.find(a => a.code === airportCode);
    if (selected) {
      setDepartureAirport(formatAirport(selected));
      setDeparturePopoverOpen(false);
    }
  };

  const handleDestinationSelect = (airportCode: string) => {
    const selected = airports.find(a => a.code === airportCode);
    if (selected) {
      setDestinationAirport(formatAirport(selected));
      setDestinationPopoverOpen(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (tripType === "one-way") {
      setDepartureDate(date);
      return;
    }
    
    if (dateSelectionMode === "departure") {
      setDepartureDate(date);
      setDateSelectionMode("return");
      // If return date is earlier than the newly selected departure date
      if (returnDate && returnDate < date) {
        setReturnDate(undefined);
      }
    } else {
      setReturnDate(date);
      setDateSelectionMode("departure");
    }
  };
  
  const resetDatePicker = () => {
    setDateSelectionMode("departure");
  };
  
  const handleSearch = () => {
    if (!departureAirport) {
      toast({
        title: "Missing information",
        description: "Please enter a departure airport",
        variant: "destructive"
      });
      return;
    }

    if (!destinationAirport) {
      toast({
        title: "Missing information",
        description: "Please enter a destination airport",
        variant: "destructive"
      });
      return;
    }

    if (!departureDate) {
      toast({
        title: "Missing information",
        description: "Please select a departure date",
        variant: "destructive"
      });
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      toast({
        title: "Missing information",
        description: "Please select a return date",
        variant: "destructive"
      });
      return;
    }

    const searchParams: FlightSearchParams = {
      departureAirport,
      destinationAirport,
      departureDate,
      returnDate: tripType === "round-trip" ? returnDate : undefined,
      directFlightsOnly,
      passengers,
      tripType
    };

    searchFlightsAsync(searchParams);
    setShowResults(true);
  };

  return (
    <>
      <div className="w-full py-10 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Compare and book cheap flights with ease</h1>
          <p className="text-lg mb-6">Discover your next dream destination</p>

          <RadioGroup 
            defaultValue="round-trip" 
            value={tripType}
            className="flex space-x-6 mb-4"
            onValueChange={(value) => {
              setTripType(value);
              resetDatePicker();
              // Reset return date when switching to one-way
              if (value === "one-way") {
                setReturnDate(undefined);
              }
            }}
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
                <Popover open={departurePopoverOpen} onOpenChange={setDeparturePopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="w-full cursor-pointer">
                      <div className="text-xs text-gray-500">From</div>
                      <Input 
                        placeholder="City or airport" 
                        value={departureAirport || departureSearchQuery}
                        onChange={(e) => {
                          setDepartureSearchQuery(e.target.value);
                          setDepartureAirport("");
                          if (!departurePopoverOpen) {
                            setDeparturePopoverOpen(true);
                          }
                        }}
                        onClick={() => setDeparturePopoverOpen(true)}
                        className="border-0 p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" 
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search airports..." 
                        value={departureSearchQuery}
                        onValueChange={setDepartureSearchQuery}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No airports found.</CommandEmpty>
                        <CommandGroup heading="Airports">
                          {filteredDepartureAirports.map((airport) => (
                            <CommandItem 
                              key={airport.code}
                              onSelect={() => handleDepartureSelect(airport.code)}
                              className="cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{airport.code} - {airport.city}</span>
                                <span className="text-xs text-muted-foreground">{airport.name}, {airport.country}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* To */}
            <div className="bg-white border rounded p-2 flex items-center">
              <div className="mr-2">
                <Plane className="h-5 w-5 text-gray-500 transform rotate-90" />
              </div>
              <div className="w-full">
                <Popover open={destinationPopoverOpen} onOpenChange={setDestinationPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="w-full cursor-pointer">
                      <div className="text-xs text-gray-500">To</div>
                      <Input 
                        placeholder="Where to?" 
                        value={destinationAirport || destinationSearchQuery}
                        onChange={(e) => {
                          setDestinationSearchQuery(e.target.value);
                          setDestinationAirport("");
                          if (!destinationPopoverOpen) {
                            setDestinationPopoverOpen(true);
                          }
                        }}
                        onClick={() => setDestinationPopoverOpen(true)}
                        className="border-0 p-0 h-6 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" 
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[300px]" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Search airports..." 
                        value={destinationSearchQuery}
                        onValueChange={setDestinationSearchQuery}
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No airports found.</CommandEmpty>
                        <CommandGroup heading="Airports">
                          {filteredDestinationAirports.map((airport) => (
                            <CommandItem 
                              key={airport.code}
                              onSelect={() => handleDestinationSelect(airport.code)}
                              className="cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{airport.code} - {airport.city}</span>
                                <span className="text-xs text-muted-foreground">{airport.name}, {airport.country}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                        <div className="text-xs text-gray-500">
                          {tripType === "round-trip" ? "Depart - Return" : "Departure Date"}
                        </div>
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
                  <PopoverContent className="w-auto p-0">
                    {tripType === "round-trip" ? (
                      <div className="p-3">
                        <div className="mb-2 text-sm font-medium">
                          {dateSelectionMode === "departure" ? "Select departure date" : "Select return date"}
                        </div>
                        <Calendar
                          mode="single"
                          selected={dateSelectionMode === "departure" ? departureDate : returnDate}
                          onSelect={handleDateSelect}
                          className={cn("p-3 pointer-events-auto")}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </div>
                    ) : (
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => date < new Date()}
                        initialFocus
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
            <Button 
              className="bg-blue-600 hover:bg-blue-700 h-16 flex items-center justify-center"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Display flight results */}
      {showResults && <FlightResults flights={flights} isLoading={loading} />}
    </>
  );
};

export default FlightSearch;
