"use client";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SearchResults } from "../components/search-results";

export default function SearchPage() {
  return (
    <div className="">
      <div className="container mx-auto px-4 ">
        <Header />
      </div>
      <SearchResults />
      <Footer />
    </div>
  );
}
