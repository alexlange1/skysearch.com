
import Navbar from "@/components/Navbar";
import FlightSearch from "@/components/FlightSearch";
import CountrySpotlight from "@/components/CountrySpotlight";
import PopularDestinations from "@/components/PopularDestinations";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <FlightSearch />
      <CountrySpotlight />
      <PopularDestinations />
      <Footer />
    </div>
  );
};

export default Index;
