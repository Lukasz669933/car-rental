import Image from "next/image";
import { Search } from "./components/search";
import { CarsNearMe } from "./components/cars-near-me";
import { BrowseCategories } from "./components/browse-categories";
import { BrowseLocations } from "./components/browse-locations";
import { MeetHosts } from "./components/meet-hosts";
import { BrowseByMake } from "./components/browse-by-make";
import { TurnCarIntoCash } from "./components/turn-car-into-cash";
import { BlogSection } from "./components/blog-section";
import { AppPromotion } from "./components/app-promotion";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { FeaturedCategories } from "./components/featured-categories";
import { SearchBar } from "./components/search-bar";
import { CountriesCategories } from "./components/countries-categories";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[600px] w-[98%] mx-auto my-[10px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Hero2-QKTSHICM.webp"
            alt="Car sales hero image"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 container  h-full flex flex-col justify-between py-[90px]  md:py-[120px] items-center  text-center text-white">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold mb-4">
              Find, buy, and own your dream car in
              <br />
              Easy steps.
            </h1>
            <p className="text-md md:text-lg mb-8 max-w-2xl">
              Purchase the perfect car for your lifestyle. Choose from a wide
              range of vehicles for any budget.
            </p>
          </div>
          <SearchBar />

          {/* <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden mt-8">
            <Search />
          </div> */}
        </div>
      </section>

      <main className="flex-grow">
        <CarsNearMe />
        <FeaturedCategories />
        <BrowseCategories />
        <CountriesCategories />
        <TurnCarIntoCash />
        <BrowseLocations />
        {/* Add the new FeaturedCategories section here */}
        {/* <MeetHosts /> */}
        {/* Full-screen Browse by Make section */}
        <BrowseByMake />
        <BlogSection />
        {/* <AppPromotion /> */}
      </main>

      <Footer />
    </div>
  );
}
