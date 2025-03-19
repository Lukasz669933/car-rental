import Image from "next/image";
import { Search } from "./components/search";
import { CarsNearMe } from "./components/cars-near-me";
import { BrowseCategories } from "./components/browse-categories";
import { BrowseLocations } from "./components/browse-locations";
import { BrowseByMake } from "./components/browse-by-make";
import { BlogSection } from "./components/blog-section";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { FeaturedCategories } from "./components/featured-categories";
import { FilterSearch } from "./components/filter-search";

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
            className="object-cover hidden md:block brightness-75"
            priority
          />
          <Image
            src="/Hero2-QKTSHICM - Copy.webp"
            alt="Car sales hero image"
            fill
            className="object-cover md:hidden brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 container  h-full flex flex-col justify-between py-[90px]  md:py-[120px] items-center  text-center text-white">
          <div>
            <h1 className="text-xl md:text-5xl font-bold mb-4">
              Find, buy, and own your dream car in Easy steps.
            </h1>
          </div>
          <div className="absolute md:bottom-10 bottom-5 left-5 right-5">
            <FilterSearch />
          </div>

          {/* <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden mt-8">
            <Search />
          </div> */}
        </div>
      </section>

      <main className="flex-grow">
        <CarsNearMe />
        <FeaturedCategories />
        <BrowseCategories />
        {/* <CountriesCategories /> */}
        {/* <TurnCarIntoCash /> */}
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
